import { Request, Response, RequestHandler } from "express";
import { ContactUs } from "../../models/contactus";
import { UsersService } from "./users.service";
import jwt from "jsonwebtoken";
import mailgun from "mailgun-js";

require("dotenv").config();

const DOMAIN: string = process.env.MAILGUN_DOMAIN!;
const mg = mailgun({
  apiKey: process.env.MAILGUN_API!,
  domain: DOMAIN,
});

export class UsersController {
  public constructor(private readonly usersService: UsersService) {
    this.usersService = usersService;
  }

  public getUsers: RequestHandler = async (req, res): Promise<Response> => {
    return this.usersService
      .getUsers()
      .then((user: ContactUs[]) => {
        return res.status(200).json({ user });
      })
      .catch((error: Error) => {
        return res.status(500).json({
          error: error,
        });
      });
  };

  public createUsers: RequestHandler = async (req, res): Promise<Response> => {
    const firstName: string = req.body.FirstName;
    const lastName: string = req.body.LastName;
    const Name: string = firstName + " " + lastName;

    req.body.Name = Name;
    req.body.UploadFileName = req.file?.originalname;
    req.body.FilePath = req.file?.path;
    return this.usersService
      .createUsers(req.body)
      .then(async(user: ContactUs) => {
        const adminEmails = await this.usersService.getAllAdminEmails();
        if(adminEmails.length>0){
          for(let e in adminEmails){
            const data = this.usersService.createData(adminEmails[e],Name, req.body.Email,req.body.Subject, req.body.PhoneNumber, req.body.Message);
            await mg.messages().send(data, (error, body) => {
              if (error) {
                return res.json({error: error.message});
              }
            });
          }
        }
        return res.status(200).json({ user });
      })
      .catch((error: Error) => {
        console.log(error);
        return res.status(500).json({
          error: error,
        });
      });
  };

  public getUserById: RequestHandler = async (req, res): Promise<Response> => {
    return this.usersService
      .getUserById(+req.params.id)
      .then((user) => {
        if (user) {
          return res.status(200).json({ user });
        }
        return res.status(404).json({ error: "NotFound" });
      })
      .catch((error: Error) => {
        return res.status(500).json({
          error: error,
        });
      });
  };

  public authenticate: RequestHandler = async (req,res,next): Promise<Response | void> => {
    const token = req.headers.authorization! || req.header('auth');
    console.log(token);
    return this.usersService
      .getUserByEmail(req.body.Email)
      .then((user) => {
        if (user) {
          if (token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
              if (error) {
                return res.status(303).json({ message: "invalid credentials" });
              } 
              else {
                return this.usersService
                  .getUserByEmail(user.userEmail)
                  .then((user) => {
                    if (user === null) {
                      return res
                        .status(401)
                        .json({ message: "user not found" });
                    }
                    req.body.CreatedBy = user.UserId;
                    next();
                  })
                  .catch((error: Error) => {
                    return res.status(500).json({
                      error: error,
                    });
                  });
              }
            });
          } 
          else {
            return res
              .status(401)
              .json({ message: "You are registered user login and try again" });
          }
        } 
        else {
            next();
        }
      })
      .catch((error: Error) => {
        return res.status(500).json({
          error: error,
        });
      });
  };
}
