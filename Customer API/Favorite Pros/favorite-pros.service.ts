import { User } from "../../models/user";
import { FavoriteProsRepository } from "./favorite-pros.repository";
import { ServiceRequest } from "../../models/servicerequest";
import { FavoriteAndBlocked } from "../../models/favoriteandblocked";

export class FavoriteProsService {
  public constructor(private readonly favoriteProsRepository: FavoriteProsRepository) 
  {
    this.favoriteProsRepository = favoriteProsRepository;
  };

  public async getAllServiceRequestByUserId(userId:number):Promise<ServiceRequest[]>{
    return this.favoriteProsRepository.getAllServiceRequestByUserId(userId);
  }

  public async getAllHelperWorkedWithCustomerInPast(userId:number[]):Promise<User[] | null>{
    return this.favoriteProsRepository.getAllHelperWorkedWithCustomerInPast(userId);
  }

  public async getFavoriteHelper(userId: number, helperId:number): Promise<FavoriteAndBlocked|null> {
    return this.favoriteProsRepository.getFavoriteHelper(userId, helperId);
  }

  public async createFavoriteHelper(favorite:{[key: number|string]:FavoriteAndBlocked}): Promise<FavoriteAndBlocked|null> {
    return this.favoriteProsRepository.createFavoriteHelper(favorite);
  }

  public async updateFavoriteHelper(favorite:FavoriteAndBlocked): Promise<[number, FavoriteAndBlocked[]]> {
    return this.favoriteProsRepository.updateFavoriteHelper(favorite);
  }

  public async updateBlockedHelper(blocked:FavoriteAndBlocked): Promise<[number, FavoriteAndBlocked[]]> {
    return this.favoriteProsRepository.updateBlockedHelper(blocked);
  }





  //Local services
  public getAllHelperIdWorkedWithCustomerInPast(sRequest:ServiceRequest[]){
    const helperId:number[] = [];
    for(let sr in sRequest){
      if(sRequest[sr].Status === 3 && sRequest[sr].ServiceProviderId != null){
        helperId.push(sRequest[sr].ServiceProviderId);
      }
    }
    return helperId;
  }

  // public async getServiceRequestHistoryOfUser(userId: number): Promise<ServiceRequest[] | null> 
  // {
  //   return this.serviceHistoryRepository.getServiceRequestHistoryOfUser(userId);
  // };

  // public async getServiceRequestDetailById(srId: number): Promise<ServiceRequest | null> 
  // {
  //   return this.serviceHistoryRepository.getServiceRequestDetailById(srId);
  // };

  // public async setRatings(ratings:{[key: number|string]:Rating}): Promise<Rating> 
  // {
  //   return this.serviceHistoryRepository.setRatings(ratings);
  // };

  // public async getRatingsByServiceRequestId(srId: number): Promise<Rating | null> 
  // {
  //   return this.serviceHistoryRepository.getRatingsByServiceRequestId(srId);
  // };








  // //local service

  // public compareDateWithCurrentDate(requestHistory:ServiceRequest[]) {
  //   const srHistory:ServiceRequest[] = [];
  //   const formatedDate2 = new Date(moment(new Date()).format("YYYY-MM-DD"));
  //   console.log(formatedDate2);
  //   for(let sr in requestHistory){
  //     const date = requestHistory[sr].ServiceStartDate;
  //     const formatedDate1 = new Date(moment(date).format("YYYY-MM-DD"));
  //     console.log(formatedDate1);
  //     if (formatedDate1 < formatedDate2) {
  //       srHistory.push(requestHistory[sr]);
  //     }
  //     console.log(srHistory);
  //   }
  //   return srHistory;
     
  // };

  // public getRatings(body: any){
  //   const Ratings = (body.OnTimeArrival + body.Friendly + body.QualityOfService)/3
  //   return Ratings;
  // }

  // public async getAllServiceRequestByUserId(userId: number): Promise<ServiceRequest[] | null> 
  // {
  //   return this.dashboardRepository.getAllServiceRequestByUserId(userId);
  // };

  // public async getServiceRequestDetailById(srId: number): Promise<ServiceRequest | null> 
  // {
  //   return this.dashboardRepository.getServiceRequestDetailById(srId);
  // };

  // public async getServiceRequestOfHelper(helperId: number): Promise<ServiceRequest[] | null> 
  // {
  //   return this.dashboardRepository.getAllServiceRequestOfHelper(helperId);
  // };

  // public async rescheduleServiceRequest(date:Date, time:string, serviceId:number): Promise<[number, ServiceRequest[]]> 
  // {
  //   return this.dashboardRepository.rescheduleServiceRequest(date, time, serviceId);
  // };

  // public async getHelperById(helperId:number):Promise<User | null>{
  //   return this.dashboardRepository.getHelperById(helperId);
  // };

  // public async updateServiceRequestStatus(serviceId:number): Promise<[number, ServiceRequest[]]> 
  // {
  //   return this.dashboardRepository.updateServiceRequestStatus(serviceId);
  // };

  // public getRequestDetailForRelatedUser()

  // public async createUserAddress(userAddress: {
  //   [key: number | string]: UserAddress;
  // }): Promise<UserAddress> {
  //   return this.bookServiceRepository.createUserAddress(userAddress);
  // }

  // public async getUserAddress(userId:number): Promise<UserAddress[]> {
  //   return this.bookServiceRepository.getUserAddresses(userId);
  // }

  // public async createFavoriteAndBlocked(fandb: {[key: number|string]:FavoriteAndBlocked}): Promise<FavoriteAndBlocked>{
  //   return this.bookServiceRepository.createFavoriteAndBlocked(fandb);
  // }

  // public async getFavoriteAndBlocked(userId:number): Promise<FavoriteAndBlocked[]>{
  //   return this.bookServiceRepository.getFavoriteAndBlocked(userId);
  // }

  // public async getUserById(userId: number[]): Promise<User[]> {
  //   return this.bookServiceRepository.getUserById(userId);
  // }

  // public async getAllHelper(): Promise<User[]> {
  //   return this.bookServiceRepository.getAllHelper();
  // }

  // public async getUserByEmail(userEmail: string): Promise<User | null> {
  //   return this.bookServiceRepository.getUserByEmail(userEmail);
  // }

  // //ServiceRequest services
  // public async createServiceRequestWithAddress(serviceRequest: {
  //   [key: number | string]: ServiceRequest;
  // }): Promise<ServiceRequest> {
  //   return this.bookServiceRepository.createServiceRequestWithAddress(serviceRequest);
  // }

  // public async getHelpersByZipCode(zipCode:string): Promise<User[]> {
  //   return this.bookServiceRepository.getHelpersByZipcode(zipCode);
  // }

  // //Advance Servics
  // public getSubTotal(serviceHourlyRate: number, serviceHour: number): number {
  //   const subTotal = serviceHourlyRate * serviceHour;
  //   return subTotal;
  // }

  // public getTotalCost(ExtraService: number[], SubTotal: number): number {
  //   const TotalCost = ExtraService.length * 9 + SubTotal;
  //   return TotalCost;
  // }

  // public createDataForAll(userEmail:string): typeof data{
  //   const data = {
  //       from: 'Helperland Team@gmail.com',
  //       to: userEmail,
  //       subject: 'About new service in your area',
  //       html: `
  //           <h1>New service is available in your area login and accept before anyone accept it.</h1>
  //           `
  //   }
  //   return data;
  // }

  // public createToken(userEmail: string, postalCode: string): string {
  //   const token = jwt.sign({ userEmail, postalCode }, process.env.SECRET_KEY!, {
  //     expiresIn: "5h",
  //   });
  //   return token;
  // }

  // public getTargetUser(user:FavoriteAndBlocked[]):number[]{
  //   let favoriteSP = [];
  //   for(let us in user){
  //     if(user[us].IsFavorite===true && user[us].IsBlocked===false){
  //       favoriteSP.push(user[us].TargetUserId);
  //     }
  //   }
  //   return favoriteSP;
  // }

  // public async getUserWithRequest(): Promise<User[]> {
  //   return this.bookServiceRepository.getUserWithRequest();
  // }

  // public async getRequestWithUser(): Promise<ServiceRequest[]> {
  //   return this.bookServiceRepository.getRequestWithUser();
  // }

  // public async createServiceRequest(serviceRequest: {
  //   [key: number | string]: ServiceRequest;
  // }): Promise<ServiceRequest> {
  //   return this.bookServiceRepository.createServiceRequest(serviceRequest);
  // }

  // public async getUsers(): Promise<User[]> {
  //   return this.bookServiceRepository.getUsers();
  // }

  // public getAllPendingServiceRequest(
  //   serviceRequest: ServiceRequest[]
  // ): ServiceRequest[] {
  //   const service: ServiceRequest[] = [];
  //   for (let sr in serviceRequest) {
  //     if (serviceRequest[sr].Status === 1) {
  //       service.push(serviceRequest[sr]);
  //     }
  //   }
  //   return service;
  // };

  // public compareDateWithCurrentDate(date: string) {
  //   const formatedDate1 = new Date(date.split("-").reverse().join("-"));
  //   const formatedDate2 = new Date(moment(new Date()).format("YYYY-MM-DD"));
  //   // const d1 = new Date(formatedDate1);
  //   // const d2 = new Date(formatedDate2);
  //   console.log(formatedDate1);
  //   console.log(formatedDate2);
  //   if (formatedDate1 > formatedDate2) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  // public helperHasFutureSameDateAndTime(
  //   date: string,
  //   serviceRequest: ServiceRequest[],
  //   totalHour: number,
  //   time: string ) 
  // {
  //     let srDate;
  //     let startTime;
  //     let endTime;
  //     const uTime = time.split(":");
  //     if(uTime[1] === '30')
  //     {
  //       uTime[1] = '0.5';
  //     }
  //     const updatedTime = parseFloat(uTime[0]) + parseFloat(uTime[1]);
  //     const enteredDate = new Date(date.split("-").reverse().join("-"));
  //     let matched;
  //     for (let count in serviceRequest) 
  //     {
  //       if (new Date(serviceRequest[count].ServiceStartDate) > enteredDate) 
  //       {
  //         matched = false;
  //       } 
  //       else if (
  //         new Date(serviceRequest[count].ServiceStartDate) < enteredDate
  //       ) 
  //       {
  //         matched = false;
  //       } 
  //       else 
  //       {

  //         const sTime =serviceRequest[count].ServiceStartTime.toString().split(":");
  //         if(sTime[1] === '30')
  //         {
  //           sTime[1] = '0.5';
  //         }
  //         const availStartTime = parseFloat(sTime[0]) + parseFloat(sTime[1]);
  //         const availTotalHour =
  //           serviceRequest[count].ServiceHours + serviceRequest[count].ExtraHours;
  //         console.log(updatedTime);
  //         console.log(totalHour)
  //         console.log(availStartTime);
  //         console.log(availTotalHour);
  //         if (
  //           updatedTime + totalHour < availStartTime ||
  //           availStartTime + availTotalHour < updatedTime
  //         ) 
  //         {
  //           matched = false;
  //         }
  //         else
  //         {
  //           srDate = serviceRequest[count].ServiceStartDate.toString().split("-").reverse().join("-");

  //           const srTime = availStartTime.toString().split('.');
  //           if(srTime[1] === '5'){
  //             srTime[1] = '30'
  //           }else{
  //             srTime[1] = '00'
  //           }
  //           startTime = srTime.join(':');

  //           const eTime = (availStartTime + availTotalHour).toString().split('.');
  //           if(parseInt(eTime[1]) === 5)
  //           {
  //             eTime[1] = '30';
  //           }else
  //           {
  //             eTime[1] = '00';
  //           }
  //           endTime = eTime.join(':');
  //           matched = true;
  //           break;
  //         }
          
  //       }
  //     }
  //     return {matched, srDate, startTime, endTime};
  // };

  // public createData(date:string,time:string,userEmail:string,srId:string): typeof data{
  //   const data = {
  //       from: 'HelperlandTeam@gmail.com',
  //       to: userEmail,
  //       subject: 'About rescheduled service request assigned to you',
  //       html: `
  //           <h1>“Service Request ${srId} has been rescheduled by customer. New date and time are ${date} ${time}”.</h1>
  //           `
  //   }
  //   return data;
  // };

  // public cancelRequestData(userEmail:string,srId:string): typeof data{
  //   const data = {
  //       from: 'HelperlandTeam@gmail.com',
  //       to: userEmail,
  //       subject: 'About cancelled service request assigned to you',
  //       html: `
  //           <h1>“Service Request ${srId} has been cancelled by customer.</h1>
  //           `
  //   }
  //   return data;
  // };

  
}
