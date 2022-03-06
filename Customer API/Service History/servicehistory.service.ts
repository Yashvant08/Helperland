import { UserAddress } from "../../models/useraddress";
import { User } from "../../models/user";
import { ServiceHistoryRepository } from "./servicehistory.repository";
import jwt from "jsonwebtoken";
import { ServiceRequest } from "../../models/servicerequest";
import { Rating } from "../../models/rating";
import { FavoriteAndBlocked } from "../../models/favoriteandblocked";
import moment from "moment";
import { StringDecoder } from "string_decoder";

export class ServiceHistoryService {
  public constructor(private readonly serviceHistoryRepository: ServiceHistoryRepository) 
  {
    this.serviceHistoryRepository = serviceHistoryRepository;
  };

  public async getServiceRequestHistoryOfUser(userId: number): Promise<ServiceRequest[] | null> 
  {
    return this.serviceHistoryRepository.getServiceRequestHistoryOfUser(userId);
  };

  public async getServiceRequestDetailById(srId: number): Promise<ServiceRequest | null> 
  {
    return this.serviceHistoryRepository.getServiceRequestDetailById(srId);
  };

  public async setRatings(ratings:{[key: number|string]:Rating}): Promise<Rating> 
  {
    return this.serviceHistoryRepository.setRatings(ratings);
  };

  public async getRatingsByServiceRequestId(srId: number): Promise<Rating | null> 
  {
    return this.serviceHistoryRepository.getRatingsByServiceRequestId(srId);
  };



  //local service

  public compareDateWithCurrentDate(requestHistory:ServiceRequest[]) {
    const srHistory:ServiceRequest[] = [];
    const formatedDate2 = new Date(moment(new Date()).format("YYYY-MM-DD"));
    console.log(formatedDate2);
    for(let sr in requestHistory){
      const date = requestHistory[sr].ServiceStartDate;
      const formatedDate1 = new Date(moment(date).format("YYYY-MM-DD"));
      console.log(formatedDate1);
      if (formatedDate1 < formatedDate2) {
        srHistory.push(requestHistory[sr]);
      }
      console.log(srHistory);
    }
    return srHistory;
     
  };

  public getRatings(body: any){
    const Ratings = (body.OnTimeArrival + body.Friendly + body.QualityOfService)/3
    return Ratings;
  }
  
}
