import { User } from "../../models/user";
import { ServiceRequestRepository } from "./servicerequest.repository";
import { ServiceRequest } from "../../models/servicerequest";
import { Rating } from "../../models/rating";
import { SRAddress } from "../../models/servicerequestaddress";

import { displayRequest, filters, updateServiceRequestBody } from "./types";
import moment from "moment";

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
      console.log(filters);

      let filterData;
      if(filters.ServiceRequestId){
        filterData = requests.filter(element => {
          return element.ServiceId === filters.ServiceRequestId
        });
      }

      if(filters.Status){
        console.log("Status");
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
        console.log("postal");
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

      if(filters.CustomerName){
        console.log("UserId");
        if(filterData){
          filterData = filterData.filter(element => {
            return element.CustomerDetails.Name === filters.CustomerName
          });
        }else{
          filterData = requests.filter(element => {
            return element.CustomerDetails.Name === filters.CustomerName
          });
        }
      }

      if(filters.ServiceProviderName){
        console.log("BySPName");
        if(filterData){
          filterData = filterData.filter(element => {
            return element.ServiceProvider.Name === filters.ServiceProviderName
          });
        }else{
          filterData = requests.filter(element => {
            return element.ServiceProvider.Name === filters.ServiceProviderName
          });
        }
        console.log(filterData);
      }

      if(filters.FromDate){
        console.log("From");
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
        console.log("to");
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
        console.log("Email");
        const user = await this.serviceRequestRepository.getUserByEmail(filters.Email);
        console.log(user?.UserId);
        if(user){
          if(filterData){
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

    public createDataForRescheduleSR(userEmail:string,body:updateServiceRequestBody): typeof data{
      const data = {
          from: 'yashvantdesai7@gmail.com',
          to: userEmail,
          subject: 'About rescheduled service request',
          html: `
              <h3>service request ${body.ServiceRequestId} has been rescheduled by admin.</h3>
              <h4>new date and time is ${body.ServiceStartDate} and ${body.ServiceTime}</h4>
              `
      }
      return data;
    }

    public createDataForUpdatedAddress(
      userEmail:string, 
      address:updateServiceRequestBody): typeof data
      {
      const data = {
          from: 'yashvantdesai7@gmail.com',
          to: userEmail,
          subject: 'About updated service request',
          html: `
              <h2>Address of service request ${address.ServiceRequestId} has been changed by admin.</h2>
              </br>
              <h3>New Address is</h3>
              </br>
              <p>Street: ${address.Addressline1}</p>
              </br>
              <p>House Number: ${address.Addressline2}</p>
              </br>
              <p>City: ${address.City}</p>
              </br>
              <p>Postal Code: ${address.PostalCode}</p>
              `
      }
      return data;
    }

    public createDataForUpdatedServiceRequest(
      userEmail:string, 
      address:updateServiceRequestBody): typeof data
      {
      const data = {
          from: 'yashvantdesai7@gmail.com',
          to: userEmail,
          subject: 'About updated and rescheduled service request',
          html: `
              <h2>service request ${address.ServiceRequestId} has been rescheduled and address is updated by admin.</h2>
              </br>
              <h3>New Address, New Date and New Time is</h3>
              </br>
              <p>Street: ${address.Addressline1}</p>
              </br>
              <p>House Number: ${address.Addressline2}</p>
              </br>
              <p>City: ${address.City}</p>
              </br>
              <p>Postal Code: ${address.PostalCode}</p>
              </br>
              <p>Date: ${address.ServiceStartDate}</p>
              </br>
              <p>Time: ${address.ServiceTime}</p>
              `
      }
      return data;
    }

    public async updateServiceRequestAddress(body:updateServiceRequestBody):Promise<[number, SRAddress[]] | null>{
      const requestAddress = await this.serviceRequestRepository.getServiceRequestAddress(body.ServiceRequestId);
      let updatedAddress;
      if(requestAddress){
        if(requestAddress.Addressline1 === body.Addressline1 &&
          requestAddress.Addressline2 === body.Addressline2 &&
          requestAddress.City === body.City &&
          requestAddress.PostalCode === body.PostalCode){
            updatedAddress =  null;
        }else{
          updatedAddress = await this.serviceRequestRepository.updateServiceRequestAddress(body);
        }
      }else{
        updatedAddress =  null;
      }
      return updatedAddress;
    }

    public async checkIfRescheduleDateIsSame(body:updateServiceRequestBody):Promise<boolean>{
      let isSame = false;
      const serviceRequest = await this.serviceRequestRepository.getServiceRequestById(
        body.ServiceRequestId);
        if(serviceRequest){
          const bodyDate = new Date(body.ServiceStartDate.split('/').reverse().join('-'));
          const srDate = new Date(serviceRequest.ServiceStartDate);
          if(bodyDate >srDate || bodyDate<srDate){
            isSame = false;
          }else{
            isSame = true;
          }
        }
        return isSame;
    }

    public compareDateWithCurrentDate(date: string) {
      const formatedDate1 = new Date(date.split("/").reverse().join("-"));
      const formatedDate2 = new Date(moment(new Date()).format("YYYY-MM-DD"));
      if (formatedDate1 > formatedDate2) {
        return true;
      } else {
        return false;
      }
    };

    public async rescheduleServiceRequest(body:updateServiceRequestBody, userId:string):Promise<[number,ServiceRequest[]]>{
      const date = new Date(body.ServiceStartDate.split('/').reverse().join('-'));
      const rescheduledSR = await this.serviceRequestRepository.rescheduleServiceRequest(
        date, body, parseInt(userId)
      );
      return rescheduledSR
    }

    // public async filterData(requests:displayRequest[], filters:filters){
    //   let filterData;
    //   if(filters.ServiceRequestId != null){
    //     requests = requests.filter(element => {
    //       return element.ServiceId === filters.ServiceRequestId
    //     });
    //   }

    //   if(filters.Status != null){
        
    //     requests= requests.filter(element => {
    //         return element.Status === filters.Status
    //       });
    //   }

    //   if(filters.PostalCode != null){
        
    //     requests = requests.filter(element => {
    //         return element.CustomerDetails.Address.PostalCode === filters.PostalCode
    //       });
    //   }

    //   if(filters.UserId != null){
    //     requests = requests.filter(element => {
    //         return element.CustomerDetails.UserId === filters.UserId
    //       });
    //   }

    //   if(filters.ServiceProviderId != null){
    //     requests = requests.filter(element => {
    //         return element.ServiceProvider.ServiceProviderId === filters.ServiceProviderId
    //       });
    //   }

    //   if(filters.HasIssue != null){
        
    //     requests = requests.filter(element => {
    //         return element.HasIssue === filters.HasIssue
    //       });
    //   }

    //   if(filters.FromDate != null){
    //     const fromDate = new Date(filters.FromDate.split('-').reverse().join('-'));
        
    //     requests = requests.filter(element => {
    //         return new Date(element.ServiceDate.Date.split('/').reverse().join('-')) >= fromDate
    //       });
    //   }

    //   if(filters.ToDate != null){
    //     const toDate = new Date(filters.ToDate.split('-').reverse().join('-'));
    //     requests= requests.filter(element => {
    //         return new Date(element.ServiceDate.Date.split('/').reverse().join('-')) <= toDate
    //       });
    //   }

    //   if(filters.Email != null){
    //     const user = await this.serviceRequestRepository.getUserByEmail(filters.Email);
    //     if(user){
          
    //       requests = requests.filter(element => {
    //           return element.CustomerDetails.UserId === user.UserId ||
    //         element.ServiceProvider.ServiceProviderId === user.UserId
    //         });
    //     }else{
    //       requests = [];
    //     }
    //   }
    //   return requests;

    // }

}
