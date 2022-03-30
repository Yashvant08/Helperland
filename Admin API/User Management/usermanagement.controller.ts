import { equal } from "assert";
import { Request, Response, RequestHandler } from "express";
import { UserManagementService } from "./usermanagement.service";

require("dotenv").config();

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

  public refundAmount: RequestHandler = async (req,res): Promise<Response> => 
  {
    let refundamount:number;
    if (req.body.userTypeId === 2) {
      if(req.body.Percentage){
        refundamount = (req.body.RefundedAmount * req.body.Percentage)/100;
      }else{
        refundamount = req.body.RefundedAmount;
      }
      if(refundamount === null){
        return res.status(401).json( {message: "refund amount can not be null"})
      }else{
        if(req.body.PaidAmount>refundamount){
          return  this.userManagementService.refundAmount(req.body.ServiceRequestId,refundamount, req.body.userId)
        .then(serviceRequest => {
          if(serviceRequest){
            if(serviceRequest[0] === 1){
              return res.status(422).json({ message: "service request refunded successfully"});
            }else{
              return res.status(422).json({ message: "amount not refunded"});
            }
          }else{
            return res.status(404).json({ message: "service request not found or service request not completed or service request already refunded"});
          }
        })
        .catch((error: Error) => {
          console.log(error);
          return res.status(500).json({ error: error });
        });
        }else{
          return res.status(401).json({ message: "refund amount must be less than paid amount"});
        }
      }
    } else {
      return res.status(401).json({ message: "unauthorised User" });
    }
  };
}
