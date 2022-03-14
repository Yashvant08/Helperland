import { ServiceHistoryRepository } from "./servicehistory.repository";
import { ServiceRequest } from "../../models/servicerequest";
import { Rating } from "../../models/rating";
import moment from "moment";


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

  public async getDatForExport(serviceRequest: ServiceRequest[]): Promise<Object[]>{
    let exportHistory: Object[] = [];
    let status:string;

    for (let history in serviceRequest) {
      let user = await this.serviceHistoryRepository.getUserDetailById(
        serviceRequest[history].ServiceProviderId
      );
      let time = await this.convertTimeToStartEndTime(serviceRequest[history]);
      if(serviceRequest[history].Status === 4){
        status = "Cancelled";
      }else{
        status = "Completed";
      }
      exportHistory.push({
        ServiceId: serviceRequest[history].ServiceRequestId,
        StartDate: serviceRequest[history].ServiceStartDate.toString().split('-').reverse().join('/') +" "+ time,
        ServiceProvider: user?.FirstName! + " " + user?.LastName!,
        Payment: serviceRequest[history].TotalCost,
        Status: status 
      });
    }
    return exportHistory;
  }

  public async convertTimeToStartEndTime(serviceRequest:ServiceRequest):Promise<string>{

    const startTimeArray = serviceRequest.ServiceStartTime.toString().split(':');
    const startTime = startTimeArray[0]+":"+startTimeArray[1]
    if(startTimeArray[1] === "30"){
      startTimeArray[1] = "0.5"
    }else{
      startTimeArray[1] = "0"
    }
    const endTimeInt = parseFloat(startTimeArray[0]) + parseFloat(startTimeArray[1]) + serviceRequest.ServiceHours + serviceRequest.ExtraHours;
    const endTimeArray = endTimeInt.toString().split('.');
    if(endTimeArray[1] === '5'){
      endTimeArray[1] = '30'
    }else{
      endTimeArray[1] = '00'
    }

    const time = startTime+" - "+endTimeArray[0]+":"+endTimeArray[1];
    return time;
  }
  
}
