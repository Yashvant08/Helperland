import { Request, Response, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { User } from "../../models/user";
import { LoginService } from "./login.service";
import bcrypt from "bcrypt";

require("dotenv").config();

export class LoginController {
  public constructor(private readonly loginService: LoginService) {
    this.loginService = loginService;
  }

  public checkLogin: RequestHandler = async (req,res): Promise<Response> => {
    return this.loginService
      .getUserByEmail(req.body.Email)
      .then(async (user: User | null) => {
        if (user) {
          const register = this.loginService.isRegister(user);
          if (register) {
            const isSame = await bcrypt.compare(
              req.body.Password,
              user.Password!
            );
            if (isSame) {
              const token = this.loginService.createToken(user.Email!);
              if(user.UserTypeId === 1){
                return res
                  .status(200)
                  .cookie("token", token, { httpOnly: true, expires:new Date(Date.now()+600000) })
                  .json({ message: "login successful super user" });
              }
              else if(user.UserTypeId === 2){
                return res
                  .status(200)
                  .cookie("token", token, { httpOnly: true, expires:new Date(Date.now()+600000) })
                  .json({ message: "login successful admin" });
              }
              else if(user.UserTypeId === 3){
                return res
                  .status(200)
                  .cookie("token", token, { httpOnly: true, expires:new Date(Date.now()+600000) })
                  .json({ message: "login successful helper" });
              }
              else{
                return res
                  .status(200)
                  .cookie("token", token, { httpOnly: true, expires:new Date(Date.now()+600000) })
                  .json({ message: "login successful user" });
              }
            }
            return res
              .status(401)
              .json({ message: "Invalid Username or Password" });
          }
          return res.json({ message: "Active your account" });
        }
        return res
          .status(401)
          .json({ message: "Invalid Username or Password" });
      })
      .catch((error: Error) => {
        console.log(error);
        return res.status(500).json({
          error: error,
        });
      });
  };

  public validateToken: RequestHandler = async (req, res, next) :Promise<Response|undefined>=> {
    const token = req.headers.authorization;

    if (token == null) {
      return res.status(401).json({ message: "invalid login credential null" });
    }
    jwt.verify(token, process.env.SECRET_KEY!, (err, user:any) => {
      if (err) {
        return res.status(401).json({message:'invalid login credential'});
      } else {
        return this.loginService.getUserByEmail(user.userEmail)
        .then(user => {
          if(user === null){
            return res.status(401).json({message:'Unauthorised user'});
          }else{
            if(user.IsRegisteredUser === true){
              console.log(user.IsRegisteredUser);
              next();
            }else{
              return res.status(401).json({message:'Activate your account'});
            }
          }
        })
        .catch((error: Error) => {
          console.log(error);
          return res.status(500).json({
            error: error,
          });
        });
        
      }
    });
  };

  public removeToken:RequestHandler = (req, res)=>{
    try {
      res.clearCookie('token');
      return res.status(200).json({message:'successfully logout'})
    } catch (error) {
      return res.status(401).json({message:'failed'});
    }
  }
}
