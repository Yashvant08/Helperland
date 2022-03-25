import { db } from "../../models/index";
import { ServiceRequest } from "../../models/servicerequest";
import { Rating } from "../../models/rating";
import { User } from "../../models/user";
import { Op } from "sequelize";
import { SRAddress } from "../../models/servicerequestaddress";

export class ServiceHistoryRepository {

  public async getServiceRequestHistoryOfUser(userId: number): Promise<ServiceRequest[] | null> {
    return db.ServiceRequest.findAll({
      where: { UserId: userId ,  Status: {
        [Op.or]: [3, 4]
      }},
    });
  }

  public async getServiceRequestDetailById(srId: number): Promise<ServiceRequest | null> {
    return db.ServiceRequest.findOne({
      where: { ServiceRequestId: srId },
      include: ["ServiceRequestAddress", "ExtraService"],
    });
  }

  public async setRatings(ratings:{[key: number|string]:Rating}): Promise<Rating>{
    return db.Rating.create(ratings);
  }

  public async getRatingsByServiceRequestId(serviceRequestId:number): Promise<Rating | null>{
    return db.Rating.findOne({where:{ServiceRequestId:serviceRequestId}});
  }

  public async getUserDetailById(userId: number): Promise<User | null> 
  {
    return db.User.findOne({where:{UserId:userId}});
  };

  public async getSPDetailById(helperId:number): Promise<User | null>{
    return db.User.findOne({where:{UserId:helperId, UserTypeId:3}});
  }

  public async getRequestAddress(requestId:number): Promise<SRAddress | null>{
    return db.SRAddress.findOne({where:{ServiceRequestId:requestId}});
  }
}
