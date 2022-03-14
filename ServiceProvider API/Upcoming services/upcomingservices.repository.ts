import { db } from "../../models/index";
import { User } from "../../models/user";
import { ServiceRequest } from "../../models/servicerequest";
import { brotliDecompress } from "zlib";


export class UpcomingServicesRepository {

  public async getAllUpcomingServicerequests(helperId:number):Promise<ServiceRequest[] | null>{
    return db.ServiceRequest.findAll({where:{ServiceProviderId:helperId, Status:2}});
  }

  public async getServiceRequestDetailById(requestId:number): Promise<ServiceRequest | null>{
    return db.ServiceRequest.findOne({where:{ServiceRequestId:requestId,Status:2 }});
  }

  public async cancelServiceRequest(srviceId: number, helperId:number): Promise<[number, ServiceRequest[]]> {
    return db.ServiceRequest.update(
      { Status:4, ModifiedBy:helperId },
      { where: { ServiceRequestId: srviceId } }
    );
  }

  public async completeServiceRequest(srviceId: number, helperId:number): Promise<[number, ServiceRequest[]]> {
    return db.ServiceRequest.update(
      { Status:3, ModifiedBy:helperId},
      { where: { ServiceRequestId: srviceId } }
    );
  }

  public async getServiceDetailById(srId: number): Promise<ServiceRequest | null> {
    return db.ServiceRequest.findOne({
      where: { ServiceRequestId: srId },
      include: ["ServiceRequestAddress", "ExtraService"],
    });
  }

  // public async getHelperDetailById(helperId:number): Promise<User | null>{
  //   return db.User.findOne({where:{UserId:helperId, UserTypeId:3}});
  // }

  // public async getServiceRequestDetailById(requestId:number): Promise<ServiceRequest | null>{
  //   return db.ServiceRequest.findOne({where:{ServiceRequestId:requestId,Status:1 }});
  // }

  // public async getAllServiceRequestsOfHelper(helperId:number):Promise<ServiceRequest[] | null>{
  //   return db.ServiceRequest.findAll({where:{ServiceProviderId:helperId, Status:2}});
  // }

  // public async getAllPendingServiceRequestByZipcode(zipCode:string):Promise<ServiceRequest[] | null>{
  //   return db.ServiceRequest.findAll({where:{ZipCode:zipCode, Status:1}, include:["ServiceRequestAddress", "UserRequest"]});
  // }

  // public async getHelpersByZipCode(zipCode:string):Promise<User[]|null>{
  //   return db.User.findAll({where:{ZipCode:zipCode, UserTypeId:3}})
  // }

  // public async acceptNewServiceRequest(srviceId: number, helperId:number): Promise<[number, ServiceRequest[]]> {
  //   return db.ServiceRequest.update(
  //     { ServiceProviderId: helperId, Status:2 },
  //     { where: { ServiceRequestId: srviceId } }
  //   );
  // }

 
  // public async getAllServiceRequestByUserId(userId: number): Promise<ServiceRequest[] | null> {
  //   return db.ServiceRequest.findAll({where: { UserId: userId, Status:1 },
  //     include: [
  //       "HelperRequest",
  //       "UserRequest",
  //       "ExtraService",
  //       "UserRequest",
  //       "ServiceRequestAddress",
  //     ],
  //   });
  // }

  // public async getServiceRequestDetailById(srId: number): Promise<ServiceRequest | null> {
  //   return db.ServiceRequest.findOne({
  //     where: { ServiceRequestId: srId },
  //     include: ["ServiceRequestAddress", "ExtraService"],
  //   });
  // }

  // public async getAllServiceRequestOfHelper(helperId: number): Promise<ServiceRequest[] | null> {
  //   return db.ServiceRequest.findAll({
  //     where: { ServiceProviderId: helperId },
  //   });
  // }

  // public async rescheduleServiceRequest(date: Date,time: string,srviceId: number): Promise<[number, ServiceRequest[]]> {
  //   return db.ServiceRequest.update(
  //     { ServiceStartDate: date, ServiceStartTime: time },
  //     { where: { ServiceRequestId: srviceId } }
  //   );
  // }

  // public async updateServiceRequestStatus(srviceId: number): Promise<[number, ServiceRequest[]]> {
  //   return db.ServiceRequest.update({Status:4},{where:{ServiceRequestId: srviceId }});
  // }

  // public async getHelperById(helperId:number):Promise<User | null>{
  //   return db.User.findOne({where:{UserId:helperId, UserTypeId:3}});
  // }
}
