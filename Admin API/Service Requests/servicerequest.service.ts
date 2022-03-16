import { User } from "../../models/user";
import { ServiceRequestRepository } from "./servicerequest.repository";
import { ServiceRequest } from "../../models/servicerequest";
import { Rating } from "../../models/rating";

import { displayRequest, filters } from "./types";
import { request } from "http";

export class ServiceRequestService {
  public constructor(
    private readonly serviceRequestRepository: ServiceRequestRepository) 
    { 
      this.serviceRequestRepository = serviceRequestRepository; 
    }

    public async getAllServiceRequests(): Promise<displayRequest[] | null> {
      let displayRequests:displayRequest[] = [];
      let ratings:(Rating | null);
      let sp:(User | null);

      const serviceRequests = await this.serviceRequestRepository.getAllServiceRequests();
      if(serviceRequests && serviceRequests.length>0){
        for(let sr in serviceRequests){

          const customer = await this.serviceRequestRepository.getUserDetailById(serviceRequests[sr].UserId);

          const address = await this.serviceRequestRepository.getServiceRequestAddress(serviceRequests[sr].ServiceRequestId);

          if(serviceRequests[sr].ServiceProviderId){
            sp = await this.serviceRequestRepository.getUserDetailById(serviceRequests[sr].ServiceProviderId);
          }else{
            sp = null
          }

          if(sp){
            ratings = await this.serviceRequestRepository.getRatings(
              customer?.UserId!, sp.UserId, serviceRequests[sr].ServiceRequestId
            );
          }else{
            ratings = null
          }

          const time = await this.convertTimeToStartEndTime(serviceRequests[sr]);

          const status = await this.getStatus(serviceRequests[sr].Status);

          displayRequests.push({
            ServiceId: serviceRequests[sr].ServiceRequestId,
            ServiceDate: {
              Date: serviceRequests[sr].ServiceStartDate.toString().split('-').reverse().join('/'),
              Time: time
            },
            CustomerDetails: {
              Name: customer?.FirstName +" "+ customer?.LastName,
              UserId: customer?.UserId!,
              Address: {
                StreetName  :   address?.Addressline1,
                HouseNumber :   address?.Addressline2,
                PostalCode  :   address?.PostalCode,
                City        :   address?.City
              }
            },
            ServiceProvider: {
              Name: sp?.FirstName +" "+ sp?.LastName,
              ServiceProviderId: sp?.UserId!,
              ProfilePicture: sp?.UserProfilePicture,
              Ratings: ratings?.Ratings
            },
            GrossAmount: serviceRequests[sr].TotalCost,
            NetAmount: serviceRequests[sr].TotalCost,
            Discount: serviceRequests[sr].Discount,
            Status: status,
            PaymentStatus: serviceRequests[sr].PaymentDone,
            HasIssue: serviceRequests[sr].HasIssue
          })
        }
        const sortedRequests = displayRequests.sort(function(a,b){ 
          return a.ServiceId - b.ServiceId;
         });
        return sortedRequests;
      }else{
        return null;
      }
    }

    public async getStatus(status:number):Promise<string | null>{
      let statusString:(string | null);
      if(status === null){
        statusString = null;
      }else if(status === 1){
        statusString = 'New';
      }else if(status === 2){
        statusString = 'Pending';
      }else if(status === 3){
        statusString = 'Completed';
      }else if(status === 4){
        statusString = 'Cancelled';
      }else if(status === 5){
        statusString = 'Refunded';
      }else{
        statusString = 'Invalid Status';
      }
      return statusString;
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

    public async filterData(requests:displayRequest[], filters:filters){

      let filterData;
      if(filters.ServiceRequestId){
        filterData = requests.filter(element => {
          return element.ServiceId === filters.ServiceRequestId
        });
      }

      if(filters.Status){
        if(filterData){
          filterData = filterData.filter(element => {
            return element.Status === filters.Status
          });
        }else{
          filterData = requests.filter(element => {
            return element.Status === filters.Status
          });
        }
      }

      if(filters.PostalCode){
        if(filterData){
          console.log(filters.PostalCode);
          filterData = filterData.filter(element => {
            return element.CustomerDetails.Address.PostalCode === filters.PostalCode
          });
        }else{
          filterData = requests.filter(element => {
            return element.CustomerDetails.Address.PostalCode === filters.PostalCode
          });
        }
      }

      if(filters.UserId){
        if(filterData){
          filterData = filterData.filter(element => {
            return element.CustomerDetails.UserId === filters.UserId
          });
        }else{
          filterData = requests.filter(element => {
            return element.CustomerDetails.UserId === filters.UserId
          });
        }
      }

      if(filters.ServiceProviderId){
        if(filterData){
          filterData = filterData.filter(element => {
            return element.ServiceProvider.ServiceProviderId === filters.ServiceProviderId
          });
        }else{
          filterData = requests.filter(element => {
            return element.ServiceProvider.ServiceProviderId === filters.ServiceProviderId
          });
        }
      }

      if(filters.HasIssue !== null){
        if(filterData){
          filterData = filterData.filter(element => {
            return element.HasIssue === filters.HasIssue
          });
        }else{
          filterData = requests.filter(element => {
            return element.HasIssue === filters.HasIssue
          });
        }
      }

      if(filters.FromDate){
        const fromDate = new Date(filters.FromDate.split('-').reverse().join('-'));
        if(filterData){
          console.log(fromDate);
          filterData = filterData.filter(element => {
            return new Date(element.ServiceDate.Date.split('/').reverse().join('-')) >= fromDate
          });
        }else{
          filterData = requests.filter(element => {
            return new Date(element.ServiceDate.Date.split('/').reverse().join('-')) >= fromDate
          });
        }
      }

      if(filters.ToDate){
        const toDate = new Date(filters.ToDate.split('-').reverse().join('-'));
        if(filterData){
          filterData = filterData.filter(element => {
            return new Date(element.ServiceDate.Date.split('/').reverse().join('-')) <= toDate
          });
        }else{
          filterData = requests.filter(element => {
            return new Date(element.ServiceDate.Date.split('/').reverse().join('-')) <= toDate
          });
        }
      }

      if(filters.Email){
        const user = await this.serviceRequestRepository.getUserByEmail(filters.Email);
        if(user){
          if(filterData){
            console.log("yes");
            filterData = filterData.filter(element => {
              return element.CustomerDetails.UserId === user.UserId ||
                     element.ServiceProvider.ServiceProviderId === user.UserId
            });
          }else{
            filterData = requests.filter(element => {
              return element.CustomerDetails.UserId === user.UserId ||
            element.ServiceProvider.ServiceProviderId === user.UserId
            });
          }
        }else{
          filterData = [];
        }
      }
      
      return filterData;

    }

    public async getServiceRequestById(requestId:string){
      return this.serviceRequestRepository.getServiceRequestById(parseInt(requestId));
    }

    public async updateServiceRequest(requestId:string, userId:string):Promise<[number, ServiceRequest[]]>{
      return this.serviceRequestRepository.updateServiceRequest(
        parseInt(requestId),
        parseInt(userId)
      );
    }

    public async getEmailAddressOfCustAndSP(serviceRequest:ServiceRequest):Promise<string[]>{
      const email:string[] = [];
      const user = await this.serviceRequestRepository.getUserDetailById(serviceRequest.UserId);
      const serviceProvider = await this.serviceRequestRepository.getUserDetailById(serviceRequest.ServiceProviderId);
      if(serviceRequest.UserId && user){
        email.push(user.Email!);
      }
      if(serviceRequest.ServiceProviderId && serviceProvider){
        email.push(serviceProvider.Email!);
      }
      return email;
    }

    public createData(userEmail:string, srId:number): typeof data{
      const data = {
          from: 'yashvantdesai7@gmail.com',
          to: userEmail,
          subject: 'About cancelled service request',
          html: `
              <h3>Due to some reason service request ${srId} has been cancelled by admin.</h3>
              `
      }
      return data;
    }

    // public async filterDataByServiceId(requests:displayRequest[], filters:displayRequest){
    //   let filterByRequestId;
    //   if(filters.ServiceId){
    //     filterByRequestId = requests.filter(element => {
    //       return element.ServiceId === filters.ServiceId
    //     });
    //   }else{
    //     filterByRequestId = null;
    //   }
    //   return filterByRequestId;

    // }

    // public async filterDataByStatus(requests:displayRequest[], filters:displayRequest){
    //   let filterByRequestId;
    //   if(filters.ServiceId){
    //     filterByRequestId = requests.filter(element => {
    //       return element.ServiceId === filters.ServiceId
    //     });
    //   }else{
    //     filterByRequestId = null;
    //   }
    //   return filterByRequestId;

    // }

  // public async getHelperDetailbyId(helperId: string): Promise<User | null> {
  //   return this.serviceRequestRepository.getHelperDetailById(parseInt(helperId));
  // }

  // public async getServiceRequestDetailById(requestId: string): Promise<ServiceRequest | null> {
  //   return this.serviceRequestRepository.getServiceRequestDetailById(parseInt(requestId));
  // }

  

  // public async getHelpersByZipCode(zipCode:string):Promise<User[]|null>{
  //   return this.serviceRequestRepository.getHelpersByZipCode(zipCode);
  // }

  // public async acceptNewServiceRequest(serviceId:string, helperId:string): Promise<[number, ServiceRequest[]]>
  // {
  //   return this.serviceRequestRepository.acceptNewServiceRequest(parseInt(serviceId), parseInt(helperId));
  // };

  // public async getAllPendingServiceRequestByZipcode(zipCode: string, helperId:string): Promise<ServiceRequest[] | null> {
  //   let sRequest:ServiceRequest[] = [];
  //   const serviceRequest = await this.serviceRequestRepository.getAllPendingServiceRequestByZipcode(zipCode);

  //   const blockedCustomer = await this.serviceRequestRepository.getBlockedCustomerOfhelper(parseInt(helperId));

  //   if(serviceRequest){
  //     if(blockedCustomer){
  //       sRequest = serviceRequest.filter(sr => 
  //         !blockedCustomer.find(rm => 
  //             (rm.TargetUserId === sr.UserId)
  //           ));
  //     }
  //   }
  //   return sRequest;


  // }
  

  // //Local Services

  // public async filterServiceRequestsCompatibleWithHelper(
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

  // public async displayRequestDetail(srequest:ServiceRequest[]):Promise<Object[]>{
  //   let requestDetail:Object[] = [];
  //   for(let sr in srequest){
  //     const user = await this.serviceRequestRepository.getUserDetailById(srequest[sr].UserId);
  //     const requestAddress = await this.serviceRequestRepository.getRequestAddress(srequest[sr].ServiceRequestId);

  //     const startTimeArray =
  //       srequest[sr].ServiceStartTime.toString().split(":")!;

  //     const endTimeInt = (
  //       parseFloat(startTimeArray[0]) + parseFloat(startTimeArray[1]) / 60 +
  //       srequest[sr].ServiceHours! + srequest[sr].ExtraHours!
  //     ).toString().split(".");

  //     if (endTimeInt[1]) {
  //       endTimeInt[1] = (parseInt(endTimeInt[1]) * 6).toString();
  //     } else {
  //       endTimeInt[1] = "00";
  //     }

  //     if(user){
  //       if(requestAddress){
  //         requestDetail.push({
  //           ServiceId:srequest[sr].ServiceRequestId,
  //           ServiceDate:srequest[sr].ServiceStartDate.toString().split("-").reverse().join("-"),
  //           Time:startTimeArray[0]+":"+startTimeArray[1]+"-"+endTimeInt[0]+":"+endTimeInt[1],
  //           Customer: user.FirstName + " " + user.LastName,
  //           Address: {
  //             Street: requestAddress.Addressline1,
  //             HouseNumber: requestAddress.Addressline2,
  //             City: requestAddress.City,
  //             PostalCode: requestAddress.PostalCode,
  //           },
  //           Payment:srequest[sr].TotalCost+" €"

  //         })
  //       }
  //     }
  //   }
  //   return requestDetail;
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

  
}
