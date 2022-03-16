import { db } from "../../models/index";
import { User } from "../../models/user";
import { ServiceRequest } from "../../models/servicerequest";
import { FavoriteAndBlocked } from "../../models/favoriteandblocked";
import { SRAddress } from "../../models/servicerequestaddress";
import { Rating } from "../../models/rating";


export class ServiceRequestRepository {

  public async getAllServiceRequests():Promise<ServiceRequest[] | null>{
    return db.ServiceRequest.findAll();
  }

  public async getServiceRequestById(requestId:number):Promise<ServiceRequest | null>{
    return db.ServiceRequest.findOne({where:{ServiceRequestId:requestId}});
  }

  public async updateServiceRequest(requestId:number, userId:number):Promise<[number, ServiceRequest[]]>{
    return db.ServiceRequest.update({Status:4, ModifiedBy:userId},{where:{ServiceRequestId:requestId}});
  }

  public async getUserByEmail(email:string): Promise<User| null>{
    return db.User.findOne({where:{Email:email}});
  }

  public async getUserDetailById(userId:number): Promise<User | null>{
    return db.User.findOne({where:{UserId:userId}});
  }

  public async getServiceRequestAddress(requestId:number): Promise<SRAddress | null>{
    return db.SRAddress.findOne({where:{ServiceRequestId:requestId}});
  }

  public async getRatings(userId:number,serviceProviderId:number,requestId:number): Promise<Rating | null>{
    return db.Rating.findOne({where:{
      RatingFrom: userId,
      RatingTo: serviceProviderId,
      ServiceRequestId:requestId
    }});
  }

  // public async getRequestAddress(requestId:number): Promise<SRAddress | null>{
  //   return db.SRAddress.findOne({where:{ServiceRequestId:requestId}});
  // }

  // public async getServiceRequestDetailById(requestId:number): Promise<ServiceRequest | null>{
  //   return db.ServiceRequest.findOne({where:{ServiceRequestId:requestId,Status:1 }});
  // }

  

  // public async getAllPendingServiceRequestByZipcode(zipCode:string):Promise<ServiceRequest[] | null>{
  //   return db.ServiceRequest.findAll({where:{ZipCode:zipCode, Status:1}});
  // }

  // public async getHelpersByZipCode(zipCode:string):Promise<User[]|null>{
  //   return db.User.findAll({where:{ZipCode:zipCode, UserTypeId:3}})
  // }

  // public async getBlockedCustomerOfhelper(helperId:number):Promise<FavoriteAndBlocked[]|null>{
  //   return db.FavoriteAndBlocked.findAll({where:{UserId:helperId, IsBlocked:true}});
  // }

  // public async acceptNewServiceRequest(srviceId: number, helperId:number): Promise<[number, ServiceRequest[]]> {
  //   return db.ServiceRequest.update(
  //     { 
  //       ServiceProviderId: helperId, 
  //       Status:2, 
  //       ModifiedBy:helperId, 
  //       SPAcceptedDate: new Date() 
  //     },
  //     { where: { ServiceRequestId: srviceId } }
  //   );
  // }
}
