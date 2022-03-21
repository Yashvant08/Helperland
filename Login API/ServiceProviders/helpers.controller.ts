import { Request, Response, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { User } from "../../models/user";
import { HelpersService } from "./helpers.service";
import bcrypt from "bcrypt";
require("dotenv").config();

const saltRounds = 10;
const UserTypeId: number = 3;

import mailgun from "mailgun-js";
const DOMAIN: string = process.env.MAILGUN_DOMAIN!;
const mg = mailgun({
  apiKey: process.env.MAILGUN_API!,
  domain: DOMAIN,
});

export class HelpersController {
  public constructor(private readonly helpersService: HelpersService) {
    this.helpersService = helpersService;
  }

  public createHelper: RequestHandler = async (req, res): Promise<Response> => {
    req.body.UserTypeId = UserTypeId;
    req.body.IsRegisteredUser = false;
    req.body.IsActive = false;
    const same = req.body.Password === req.body.ConfirmPassword;
    if (!same) {
      return res.status(400).json({ message: "Password does not match " });
    } else {
      return this.helpersService
        .getHelperByEmail(req.body.Email)
        .then((helper) => {
          if (helper) {
            return res
              .status(400)
              .json({ message: "Email already registered" });
          }
          return this.helpersService
            .getHelperByMobile(req.body.Mobile)
            .then(async (helper) => {
              if (helper) {
                return res
                  .status(400)
                  .json({ message: "Mobile already registered" });
              }
              req.body.Password = await bcrypt.hash(
                req.body.Password,
                saltRounds
              );
              return this.helpersService
                .createHelper(req.body)
                .then((helper: User) => {
                  const token = this.helpersService.createToken(helper.Email!);
                  const data = this.helpersService.createData(
                    helper.Email!,
                    token
                  );
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
          const { helperEmail } = decodedToken;
          if (helperEmail) {
            return this.helpersService
              .getHelperByEmail(helperEmail)
              .then((helper) => {
                if (helper) {
                  helper.IsRegisteredUser = true;
                  return this.helpersService
                    .updateHelper(helper.IsRegisteredUser, helper.Email!)
                    .then((helper) => {
                      return res.status(200).json({
                        message:
                          "You are now successfully registered as a helper",
                          helper
                      });
                    })
                    .catch((error: Error) => {
                      console.log(error);
                      return res.status(500).json(error);
                    });
                    
                }
                return res.json({ error: "Something went wrong!!!" });
              })
              .catch((error: Error) => {
                console.log(error);
                return res.status(500).json(error);
              });
          }
          return res.json({ error: "Something went wrong!!!" });
        }
      );
    } else {
      return res.json({ error: "Something went wrong!!!" });
    }
  };
}
