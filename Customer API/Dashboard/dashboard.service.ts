import { User } from "../../models/user";
import { DashboardRepository } from "./dashboard.repository";
import { ServiceRequest } from "../../models/servicerequest";
import moment from "moment";

export class DashboardService {
  public constructor(private readonly dashboardRepository: DashboardRepository) 
  {
    this.dashboardRepository = dashboardRepository;
  };

  public async getAllServiceRequestByUserId(userId: number): Promise<ServiceRequest[] | null> 
  {
    return this.dashboardRepository.getAllServiceRequestByUserId(userId)
    .then(serviceRequests => {
      const sRequest:ServiceRequest[] = [];
      const currentDate = new Date(moment(new Date()).format("YYYY-MM-DD"));
      if(serviceRequests){
        for(let sr in serviceRequests){
          let serviceRequestDate = new Date(serviceRequests[sr].ServiceStartDate);
          if(currentDate >= serviceRequestDate ){
            console.log('hi');
            continue;
          }
          sRequest.push(serviceRequests[sr]);
        }
      }
      return sRequest;
    });;
  };

  public async getServiceRequestDetailById(srId: number): Promise<ServiceRequest | null> 
  {
    return this.dashboardRepository.getServiceRequestDetailById(srId);
  };

  public async getServiceRequestOfHelper(helperId: number): Promise<ServiceRequest[] | null> 
  {
    return this.dashboardRepository.getAllServiceRequestOfHelper(helperId);
  };

  public async rescheduleServiceRequest(date:Date, time:string, serviceId:number, userId:string): Promise<[number, ServiceRequest[]]> 
  {
    return this.dashboardRepository.rescheduleServiceRequest(date, time, serviceId, parseInt(userId));
  };

  public async getHelperById(helperId:number):Promise<User | null>{
    return this.dashboardRepository.getHelperById(helperId);
  };

  public async updateServiceRequestStatus(serviceId:number, userId:number): Promise<[number, ServiceRequest[]]> 
  {
    return this.dashboardRepository.updateServiceRequestStatus(serviceId,userId);
  };

  public compareDateWithCurrentDate(date: string) {
    const formatedDate1 = new Date(date.split("-").reverse().join("-"));
    const formatedDate2 = new Date(moment(new Date()).format("YYYY-MM-DD"));
    if (formatedDate1 > formatedDate2) {
      return true;
    } else {
      return false;
    }
  };

  public helperHasFutureSameDateAndTime(
    date: string,
    serviceRequest: ServiceRequest[],
    totalHour: number,
    time: string ) 
  {
      let srDate;
      let startTime;
      let endTime;
      const uTime = time.split(":");
      if(uTime[1] === '30')
      {
        uTime[1] = '0.5';
      }
      const updatedTime = parseFloat(uTime[0]) + parseFloat(uTime[1]);
      const enteredDate = new Date(date.split("-").reverse().join("-"));
      let matched;
      for (let count in serviceRequest) 
      {
        if (new Date(serviceRequest[count].ServiceStartDate) > enteredDate) 
        {
          matched = false;
        } 
        else if (
          new Date(serviceRequest[count].ServiceStartDate) < enteredDate
        ) 
        {
          matched = false;
        } 
        else 
        {

          const sTime =serviceRequest[count].ServiceStartTime.toString().split(":");
          if(sTime[1] === '30')
          {
            sTime[1] = '0.5';
          }
          const availStartTime = parseFloat(sTime[0]) + parseFloat(sTime[1]);
          const availTotalHour =
            serviceRequest[count].ServiceHours + serviceRequest[count].ExtraHours;
          console.log(updatedTime);
          console.log(totalHour)
          console.log(availStartTime);
          console.log(availTotalHour);
          if (
            updatedTime + totalHour < availStartTime ||
            availStartTime + availTotalHour < updatedTime
          ) 
          {
            matched = false;
          }
          else
          {
            srDate = serviceRequest[count].ServiceStartDate.toString().split("-").reverse().join("-");

            const srTime = availStartTime.toString().split('.');
            if(srTime[1] === '5'){
              srTime[1] = '30'
            }else{
              srTime[1] = '00'
            }
            startTime = srTime.join(':');

            const eTime = (availStartTime + availTotalHour).toString().split('.');
            if(parseInt(eTime[1]) === 5)
            {
              eTime[1] = '30';
            }else
            {
              eTime[1] = '00';
            }
            endTime = eTime.join(':');
            matched = true;
            break;
          }
          
        }
      }
      return {matched, srDate, startTime, endTime};
  };

  public createData(date:string,time:string,userEmail:string,srId:string): typeof data{
    const data = {
        from: 'yashvantdesai7@gmail.com',
        to: userEmail,
        subject: 'About rescheduled service request assigned to you',
        html: `
            <h1>“Service Request ${srId} has been rescheduled by customer. New date and time are ${date} ${time}”.</h1>
            `
    }
    return data;
  };

  public cancelRequestData(userEmail:string,srId:string): typeof data{
    const data = {
        from: 'HelperlandTeam@gmail.com',
        to: userEmail,
        subject: 'About cancelled service request assigned to you',
        html: `
            <h1>“Service Request ${srId} has been cancelled by customer.</h1>
            `
    }
    return data;
  };

  
}
