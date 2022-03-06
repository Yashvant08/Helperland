import { db } from "../../models/index";
import { User } from "../../models/user";
import { ServiceRequest } from "../../models/servicerequest";


export class DashboardRepository {
  public async getAllServiceRequestByUserId(userId: number): Promise<ServiceRequest[] | null> {
    return db.ServiceRequest.findAll({where: { UserId: userId, Status:1 },
      include: [
        "HelperRequest",
        "UserRequest",
        "ExtraService",
        "UserRequest",
        "ServiceRequestAddress",
      ],
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

  public async rescheduleServiceRequest(date: Date,time: string,srviceId: number): Promise<[number, ServiceRequest[]]> {
    return db.ServiceRequest.update(
      { ServiceStartDate: date, ServiceStartTime: time },
      { where: { ServiceRequestId: srviceId } }
    );
  }

  public async updateServiceRequestStatus(srviceId: number): Promise<[number, ServiceRequest[]]> {
    return db.ServiceRequest.update({Status:4},{where:{ServiceRequestId: srviceId }});
  }

  public async getHelperById(helperId:number):Promise<User | null>{
    return db.User.findOne({where:{UserId:helperId, UserTypeId:3}});
  }
}
