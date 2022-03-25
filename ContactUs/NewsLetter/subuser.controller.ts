import { Request, Response, RequestHandler } from 'express';
import { SubUser } from "../../models/subuser";
import { SubUserService } from './subuser.service';
import  jwt from 'jsonwebtoken';
import nodemailer from "nodemailer";
// import mailgun from "mailgun-js";

require("dotenv").config();

// const DOMAIN: string = process.env.MAILGUN_DOMAIN!;
// const mg = mailgun({
//   apiKey: process.env.MAILGUN_API!,
//   domain: DOMAIN,
// });


const transporter = nodemailer.createTransport({
  service: process.env.SERVICE,
  auth: {
      user: process.env.USER,
      pass: process.env.PASS,
  },
});



export class SubUserController{
    public constructor(private readonly subUserService: SubUserService){
        this.subUserService = subUserService;
    }

    public createSubUser:RequestHandler = async (req, res):Promise<Response> => {
      const Email:string = req.body.Email;
      req.body.IsConfirmedSub = false;
      if(Email){
        return this.subUserService.getSubUserByEmail(Email)
        .then(user => {
          if(!user){
            return this.subUserService.createSubUser(req.body)
            .then(user => {
              const token  = this.subUserService.createToken(user.Email);
              const data = this.subUserService.createData(user.Email, token);
              transporter.sendMail(data, function (error, body) {
                if (error) {
                  return res.json({
                    error: error.message,
                  });
                }
              });
              return res.status(200).json({
                  message:
                    "Confirmation link has been sent to you Email ID",
                });
            })
            .catch((error: Error) => {
              console.log(error);
              return res.status(500).json({
              error: error
              });
          });
          }
          else{
            return res.status(400).json({mesage:'You can subscribe only one time'});
          }
        })
        .catch((error: Error) => {
                return res.status(500).json({
                error: error
                });
            });
      }
      else{
        return res.status(401).json({mesage:'something went wrong'});
      }
    };

    public subConfirmation:RequestHandler = async (req , res): Promise<Response> => {
      const {token} = req.params;
      if(token){
        jwt.verify(token, process.env.JWT_ACC_ACTIVATE!,(error, decodedToken:any) => {
          if (error) {
            return res.status(400).json({ error: "Incorrect or Expired link" });
          }else{
            const {Email} = decodedToken;
            if(Email){
              return this.subUserService
              .getSubUserByEmail(Email)
              .then((subUser) => {
                if (subUser) {
                  subUser.IsConfirmedSub = true;
                  return this.subUserService
                    .updateSubUser(subUser.IsConfirmedSub, subUser.Email!)
                    .then((user) => {
                      return res.status(200).json({
                          message: "You are now successfully registered",
                          user
                        });
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
            }else{
              return res.status(401).json({mesage:'Email not found'});
            }
          }
        })
        return res
      }
      else{
        return res.status(401).json({mesage:'token not found'});
      }
    };

    public sendEmailToAll = async (req: Request, res: Response): Promise<Response> => {
      return this.subUserService
        .getSubUsers()
        .then(async (SubUser: SubUser[]) => {
          if(SubUser.length <= 0){
            return res.status(200).json({message:'user not found'});
          }else{
            const user = {...{ ...SubUser }};
            const email:string[] = [];
            for(const subUser in user){
              if(user[subUser].IsConfirmedSub === true){
                email.push((user[subUser].Email));
              }
            };
            console.log(email);
            for(let e in email){
              const data = this.subUserService.createDataForAll(email[e]);
              transporter.sendMail(data, function (error, body) {
                if (error) {
                  return res.json({
                    error: error.message,
                  });
                }
              });
            }
            return res.status(200).json({message:'mail sent successfully'});
          }
        })
        .catch((error: Error) => {
          return res.status(500).json({
            error: error
          });
      });
    };

    

    public getSubUserById:RequestHandler = async (req , res): Promise<Response> => {
      return this.subUserService
        .getSubUserById(+req.params.id)
        .then(subUser => {
          if (subUser) {
            return res.status(200).json(subUser);
          }else{
            return res.status(404).json({ error: 'NotFound' });
          }
        })
        .catch((error: Error) => {
          return res.status(500).json({
            error: error
          });
        });
    };
  
    public getAllSubUsers = async (req: Request, res: Response): Promise<Response> => {
      return this.subUserService
        .getSubUsers()
        .then((SubUser: SubUser[]) => {
          return res.status(200).json({ SubUser });
        })
        .catch((error: Error) => {
          return res.status(500).json({
            error: error
          });
      });
    };
}