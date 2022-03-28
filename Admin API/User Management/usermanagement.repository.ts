import { db } from "../../models/index";
import { User } from "../../models/user";
import { Op } from "sequelize";
import { ServiceRequest } from "../../models/servicerequest";


export class UserManagementRepository {

  public async getAllUsers():Promise<User[] | null>{
    return db.User.findAll({where:{UserTypeId:{[Op.or]:[3,4]}}});
  }

  public async getUserDetailById(userId:number): Promise<User | null>{
    return db.User.findOne({where:{UserId:userId, UserTypeId:{[Op.or]:[3,4]}}});
  }

  public async activeUser(userId:number): Promise<[number, User[]]>{
    return db.User.update({IsActive:true},{where:{UserId:userId}});
  }

  public async inActiveUser(userId:number): Promise<[number, User[]]>{
    return db.User.update({IsActive:false},{where:{UserId:userId}});
  }

  public async getServiceRequestDetailById(srId:number): Promise<ServiceRequest | null>{
    return db.ServiceRequest.findOne({where:{ServiceRequestId:srId, Status:3}});
  }

  public async refundAmount(srId:number, refundedAmount:number, userId:number):Promise<[number, ServiceRequest[]]>{
    return db.ServiceRequest.update(
      {
        RefundedAmount:refundedAmount, 
        Status:5,
        ModifiedBy:userId
      },
      {
        where:
        {
          ServiceRequestId:srId
        }
      })
  }
}
