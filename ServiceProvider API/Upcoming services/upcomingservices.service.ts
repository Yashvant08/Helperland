import { UpcomingServicesRepository } from "./upcomingservices.repository";
import { ServiceRequest } from "../../models/servicerequest";
import moment from "moment";

export class UpcomingService {
  public constructor(
    private readonly upcomingServicesRepository: UpcomingServicesRepository
  ) {
    this.upcomingServicesRepository = upcomingServicesRepository;
  }

  public async getAllUpcomingServicerequests(helperId:string):Promise<ServiceRequest[] | null>{
    return this.upcomingServicesRepository.getAllUpcomingServicerequests(parseInt(helperId))
    .then(serviceRequests => {
      const sRequest:ServiceRequest[] = [];
      const currentDate = new Date(moment(new Date()).format("YYYY-MM-DD"));
      if(serviceRequests){
        for(let sr in serviceRequests){
          let serviceRequestDate = new Date(serviceRequests[sr].ServiceStartDate);
          if(currentDate > serviceRequestDate ){
            continue;
          }
          sRequest.push(serviceRequests[sr]);
        }
      }
      return sRequest;
    });
  }

  public async getServiceRequestDetailById(requestId: string): Promise<ServiceRequest | null> {
    return this.upcomingServicesRepository.getServiceRequestDetailById(parseInt(requestId));
  }

  public async cancelServiceRequest(serviceId:string, helperId:string): Promise<[number, ServiceRequest[]]>
  {
    return this.upcomingServicesRepository.cancelServiceRequest(parseInt(serviceId),parseInt(helperId));
  };

  public async completeServiceRequest(serviceId:string,helperId:string): Promise<[number, ServiceRequest[]]>
  {
    return this.upcomingServicesRepository.completeServiceRequest(parseInt(serviceId),parseInt(helperId));
  };

  public async getServiceRequestDetailForCompleteRequest(requestId: string): Promise<ServiceRequest | null> {
    return this.upcomingServicesRepository.getServiceRequestDetailById(parseInt(requestId))
  }

  public async getServiceDetailById(srId: number): Promise<ServiceRequest | null> 
  {
    return this.upcomingServicesRepository.getServiceDetailById(srId);
  };


  //Local Services

  public async isRequestTimeLessThanCurrentDateAndTime(serviceRequest: ServiceRequest): Promise<ServiceRequest | null> {
    const sRequestDate = new Date(serviceRequest!?.ServiceStartDate);
    const currentDate = new Date(moment(new Date()).format("YYYY-MM-DD"));

    var time = serviceRequest.ServiceStartTime.toString().split(":");
    const requestTime = parseFloat(time[0]) + parseFloat(time[1]) / 60;
    const requestTotalTime =
      requestTime + serviceRequest.ServiceHours + serviceRequest.ExtraHours;
    const currentTotalTime =new Date().getHours() + new Date().getMinutes() / 60;

    if (sRequestDate < currentDate) {
      return serviceRequest;
    } 
    else if (sRequestDate > currentDate) {
      return null;
    } 
    else {
      if (requestTotalTime < currentTotalTime) 
      {
        return serviceRequest;
      } 
      else 
      {
        return null;
      }
    }
  }




  // public async getHelperDetailbyId(helperId: string): Promise<User | null> {
  //   return this.serviceRequestRepository.getHelperDetailById(parseInt(helperId));
  // }

  // public async getServiceRequestDetailById(requestId: string): Promise<ServiceRequest | null> {
  //   return this.serviceRequestRepository.getServiceRequestDetailById(parseInt(requestId));
  // }

  // public async getAllServiceRequestsOfHelper(helperId: string): Promise<ServiceRequest[] | null> {
  //   return this.serviceRequestRepository.getAllServiceRequestsOfHelper(parseInt(helperId));
  // }

  // public async getAllPendingServiceRequestByZipcode(zipCode: string): Promise<ServiceRequest[] | null> {
  //   return this.serviceRequestRepository.getAllPendingServiceRequestByZipcode(zipCode);
  // }

  // public async getHelpersByZipCode(zipCode:string):Promise<User[]|null>{
  //   return this.serviceRequestRepository.getHelpersByZipCode(zipCode);
  // }

  // public async acceptNewServiceRequest(serviceId:string, helperId:string): Promise<[number, ServiceRequest[]]>
  // {
  //   return this.serviceRequestRepository.acceptNewServiceRequest(parseInt(serviceId), parseInt(helperId));
  // };
  

  // //Local Services

  // public filterServiceRequestsCompatibleWithHelper(
  //   includePets: boolean,
  //   serviceRequests: ServiceRequest[]
  // ) {
  //   let sRequests: ServiceRequest[] = [];
  //   if (includePets === false) {
  //     for (let sr in serviceRequests) {
  //       if (serviceRequests[sr].HasPets === false) {
  //         sRequests.push(serviceRequests[sr]);
  //       }
  //     }
  //   } else {
  //     return serviceRequests;
  //   }
  //   return sRequests;
  // }



  // public helperHasFutureSameDateAndTime(
  //   date: Date,
  //   serviceRequest: ServiceRequest[],
  //   acceptTotalHour: number,
  //   time: number
  // ) {
  //   let srId;
  //   let matched = false;
  //   for (let sr in serviceRequest) {
  //     if (serviceRequest[sr].ServiceStartDate === date) {
  //       const acceptTime = time.toString().split(":");
  //       if (acceptTime[1] === "30") {
  //         acceptTime[1] = "0.5";
  //       }
  //       const acceptStartTime =
  //         parseFloat(acceptTime[0]) + parseFloat(acceptTime[1]);

  //       const availableTime =
  //         serviceRequest[sr].ServiceStartTime.toString().split(":");
  //       if (availableTime[1] === "30") {
  //         availableTime[1] = "0.5";
  //       }
  //       const availableStartTime =
  //         parseFloat(availableTime[0]) + parseFloat(availableTime[1]);
  //       const availableTotalHour =
  //         serviceRequest[sr].ServiceHours + serviceRequest[sr].ExtraHours;
  //       // console.log(acceptStartTime);
  //       // console.log(acceptTotalHour);
  //       // console.log(availableStartTime);
  //       // console.log(availableTotalHour);
  //       const totalAcceptTime = acceptStartTime + acceptTotalHour + 1;
  //       const totalAvailableTime = availableStartTime + availableTotalHour + 1;
  //       if (
  //         availableStartTime >= totalAcceptTime ||
  //         acceptStartTime >= totalAvailableTime
  //       ) {
  //         matched = false;
  //       } else {
  //         srId = serviceRequest[sr].ServiceRequestId;
  //         matched = true;
  //         break;
  //       }
  //     } else {
  //       matched = false;
  //     }
  //   }
  //   return {matched, srId};
  // }

  // public createData(userEmail:string, srId:string): typeof data{
  //   const data = {
  //       from: 'yashvantdesai7@gmail.com',
  //       to: userEmail,
  //       subject: 'About assigned service request',
  //       html: `
  //           <h3>A service request ${srId} has already been accepted by someone and is no more available to you.</h3>
  //           `
  //   }
  //   return data;
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

  // public compareDateWithCurrentDate(date: string) {
  //   const formatedDate1 = new Date(date.split("-").reverse().join("-"));
  //   const formatedDate2 = new Date(moment(new Date()).format("YYYY-MM-DD"));
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
  //       from: 'yashvantdesai7@gmail.com',
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
