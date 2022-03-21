import { Request, Response, RequestHandler } from "express";
import { UserManagementService } from "./usermanagement.service";
import mailgun from "mailgun-js";

require("dotenv").config();

const DOMAIN: string = process.env.MAILGUN_DOMAIN!;
const mg = mailgun({
  apiKey: process.env.MAILGUN_API!,
  domain: DOMAIN,
});

export class UserManagementController {
  public constructor(
    private readonly userManagementService: UserManagementService
  ) {
    this.userManagementService = userManagementService;
  }

  public getAllUsers: RequestHandler = async (req,res): Promise<Response> => 
  {
    if (req.body.userTypeId === 2 && req.body.userId) {
      return this.userManagementService
        .getAllUsers()
        .then((users) => {
          if (users && users.length > 0) {
            return res.status(200).json(users);
          } else {
            return res.status(404).json({ message: "users not found" });
          }
        })
        .catch((error: Error) => {
          console.log(error);
          return res.status(500).json({ error: error });
        });
    } else {
      return res.status(401).json({ message: "unauthorised user" });
    }
  };


  public activeInactiveUser: RequestHandler = async (req,res): Promise<Response> => 
  {
    if (req.body.userTypeId === 2) {
      if(req.body.Active){
        return  this.userManagementService.activeUser(req.params.userId)
        .then(activeUser => {
          if(activeUser !== null){
            if(activeUser[0] === 1){
              return res.status(200).json({ message: "user activated successfully"});
            }else{
              return res.status(422).json({ message: "error in  activating user"});
            }
          }else{
            return res.status(404).json({ message: "user account already active or user not found" });
          }
        })
        .catch((error: Error) => {
          console.log(error);
          return res.status(500).json({ error: error });
        });
      }else{
        return  this.userManagementService.inActiveUser(req.params.userId)
        .then(inActiveUser => {
          if(inActiveUser !== null){
            if(inActiveUser[0] === 1){
              return res.status(200).json({ message: "user inActive successfully"});
            }else{
              return res.status(422).json({ message: "error in  inActivating user"});
            }
          }else{
            return res.status(404).json({ message: "user account already inActive or user not found" });
          }
        })
        .catch((error: Error) => {
          console.log(error);
          return res.status(500).json({ error: error });
        });
      }
    } else {
      return res.status(401).json({ message: "Unauthorised User" });
    }
  };
}
