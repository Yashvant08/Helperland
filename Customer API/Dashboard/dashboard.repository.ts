import { db } from "../../models/index";
import { User } from "../../models/user";
import { ServiceRequest } from "../../models/servicerequest";
import { SRAddress } from "../../models/servicerequestaddress";
import { Op } from "sequelize";


export class DashboardRepository {
  public async getAllServiceRequestByUserId(userId: number): Promise<ServiceRequest[] | null> {
    return db.ServiceRequest.findAll({where: { UserId: userId, Status:{[Op.or]:[1,2]}}
    });
  }

  public async getServiceRequestDetailById(srId: number): Promise<ServiceRequest | null> {
    return db.ServiceRequest.findOne({
      where: { ServiceRequestId: srId },
      include: ["ServiceRequestAddress", "ExtraService"],
    });
  }

  public async getAllServiceRequestOfHelper(helperId: number): Promise<ServiceRequest[] | null> {
    return db.ServiceRequest.findAll({
      where: { ServiceProviderId: helperId },
    });
  }

  public async rescheduleServiceRequest(date: Date,time: string,srviceId: number, userId:number): Promise<[number, ServiceRequest[]]> {
    return db.ServiceRequest.update(
      { ServiceStartDate: date, ServiceStartTime: time, ModifiedBy:userId },
      { where: { ServiceRequestId: srviceId } }
    );
  }

  public async updateServiceRequestStatus(srviceId: number, userId:number): Promise<[number, ServiceRequest[]]> {
    return db.ServiceRequest.update({Status:4, ModifiedBy:userId},{where:{ServiceRequestId: srviceId }});
  }

  public async getHelperById(helperId:number):Promise<User | null>{
    return db.User.findOne({where:{UserId:helperId, UserTypeId:3}});
  }

  public async getUserDetailById(helperId:number): Promise<User | null>{
    return db.User.findOne({where:{UserId:helperId, UserTypeId:3}});
  }

  public async getRequestAddress(requestId:number): Promise<SRAddress | null>{
    return db.SRAddress.findOne({where:{ServiceRequestId:requestId}});
  }
}
