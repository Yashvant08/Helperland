import { Request, Response, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { UsersService } from "./users.service";
import bcrypt from "bcrypt";
import mailgun from "mailgun-js";

require("dotenv").config();

const DOMAIN: string = process.env.MAILGUN_DOMAIN!;
const mg = mailgun({
  apiKey: process.env.MAILGUN_API!,
  domain: DOMAIN,
});

const saltRounds: number = 10;

const UserTypeId: number = 1;

export class UsersController {
  public constructor(private readonly usersService: UsersService) {
    this.usersService = usersService;
  }

  public createUsers: RequestHandler = async (req, res): Promise<Response> => {
    req.body.UserTypeId = UserTypeId;
    req.body.IsRegisteredUser = false;
    const same = req.body.Password === req.body.ConfirmPassword;
    if (!same) {
      return res.status(400).json({ message: "Password does not match " });
    } else {
      return this.usersService
        .getUserByEmail(req.body.Email)
        .then((user) => {
          if (user) {
            return res.status(400).json({ message: "Email already registered" });
          }
          return this.usersService
            .getUserByMobile(req.body.Mobile)
            .then(async (user) => {
              if (user) {
                return res.status(400).json({ message: "Mobile already registered" });
              }
              req.body.Password = await bcrypt.hash(req.body.Password,saltRounds);
              return this.usersService
                .createUsers(req.body)
                .then((user: User) => {
                  const token = this.usersService.createToken(user.Email!);
                  const data = this.usersService.createData(user.Email!, token);
                  mg.messages().send(data, function (error, body) {
                    if (error) {
                      return res.json({
                        error: error.message,
                      });
                    }
                  });
                  return res.status(200).json({
                      message:
                        "Email successfully sent, kindly active your account",
                    });
                })
                .catch((error: Error) => {
                  console.log(error);
                  return res.status(500).json({
                    error: error,
                  });
                });
            })
            .catch((error: Error) => {
              console.log(error);
              return res.status(500).json(error);
            });
        })
        .catch((error: Error) => {
          console.log(error);
          return res.status(500).json(error);
        });
    }
  };

  public activateAccount: RequestHandler = async (req,res): Promise<Response | undefined> => {
    const { token } = req.params;
    if (token) {
      jwt.verify(token,process.env.JWT_ACC_ACTIVATE!,(error, decodedToken: any) => {
          if (error) {
            return res.status(400).json({ error: "Incorrect or Expired link" });
          }
          const { userEmail } = decodedToken;
          if (userEmail) {
            return this.usersService
              .getUserByEmail(userEmail)
              .then((user) => {
                if (user) {
                  user.IsRegisteredUser = true;
                  return this.usersService
                    .updateUser(user.IsRegisteredUser, user.Email!)
                    .then((user) => {
                      return res.status(200)
                      .json({message: "You are now successfully registered",user});
                    })
                    .catch((error: Error) => {
                      console.log(error);
                      return res.status(500).json(error);
                    });
                }
              })
              .catch((error: Error) => {
                console.log(error);
                return res.status(500).json(error);
              });
          }
        }
      );
    } else {
      return res.json({ error: "Something went wrong!!!" });
    }
  };
}
