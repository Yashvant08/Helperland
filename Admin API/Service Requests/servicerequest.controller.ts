import { Request, Response, RequestHandler } from "express";
import { ServiceRequestService } from "./servicerequest.service";
import mailgun from "mailgun-js";
import { displayRequest, filters } from "./types";


require("dotenv").config();

const DOMAIN: string = process.env.MAILGUN_DOMAIN!;
const mg = mailgun({
  apiKey: process.env.MAILGUN_API!,
  domain: DOMAIN,
});

export class ServiceRequestController {
  public constructor(
    private readonly serviceRequestService: ServiceRequestService
  ) {
    this.serviceRequestService = serviceRequestService;
  }

  public getAllServiceRequests: RequestHandler = async (req,res): Promise<Response> => 
  {
    if (req.body.userTypeId === 2 && req.body.userId) {
        return this.serviceRequestService.getAllServiceRequests()
        .then(serviceRequests => {
          if(serviceRequests && serviceRequests.length>0){
            return res.status(200).json(serviceRequests);
          }else{
            return res.status(404).json({message:'service requests not found'});
          }
        })
        .catch((error: Error) => {
          console.log(error);
          return res.status(500).json({error: error});
        });
    } else {
      return res.status(401).json({ message: "unauthorised user" });
    }
  };

  public filteredServiceRequests: RequestHandler = async (req,res): Promise<Response> => {
    const filters:filters = req.body;
    if (req.body.userTypeId === 2) {
      return this.serviceRequestService.getAllServiceRequests()
        .then(async serviceRequests => {
          if(serviceRequests && serviceRequests.length>0){

            const filteredArray  = await this.serviceRequestService.filterData(serviceRequests,filters);
            return res.status(200).json(filteredArray);
          }else{
            return res.status(404).json({message:'service requests not found'});
          }
        })
        .catch((error: Error) => {
          console.log(error);
          return res.status(500).json({error: error});
        });
        
    } else {
      return res.status(401).json({ message: "Unauthorised User" });
    }
  };

  public cancelServiceRequest: RequestHandler = async (req,res): Promise<Response> => {
    if (req.body.userTypeId === 2) {
      if(req.params.requestId){
        return this.serviceRequestService.getServiceRequestById(req.params.requestId)
        .then(async serviceRequest => {
          if(serviceRequest){
            if(serviceRequest.Status === 3){
              return res.status(401).json({message:'completed service request can not cancel.'});
            }else if(serviceRequest.Status === 4){
              return res.status(401).json({message:'service request already cancelled.'});
            }else if(serviceRequest.Status === 5){
              return res.status(401).json({message:'service request already refunded.'});
            }else{
              return this.serviceRequestService.updateServiceRequest(
                req.params.requestId,
                req.body.userId )
              .then(async updatedServiceRequest => {
                if(updatedServiceRequest[0] === 1){
                  const email = await this.serviceRequestService.getEmailAddressOfCustAndSP(serviceRequest);
                  console.log(email);
                  for(let e in email){
                    const data = this.serviceRequestService.createData(email[e],serviceRequest.ServiceRequestId)
                    mg.messages().send(data, (error, body) => {
                      if (error) {
                        return res.json({error: error.message });
                      }
                    })
                  }
                  return res.status(200).json({message:'service request cancelled successfully.'});
                }else{
                  return res.status(422).json({message:'errr in cancelling request.'});
                }
              })
              .catch((error: Error) => {
                console.log(error);
                return res.status(500).json({error: error});
              });
            }
          }else{
            return res.status(200).json({message:'service request not found'});
          }
        })
        .catch((error: Error) => {
          console.log(error);
          return res.status(500).json({error: error});
        });
      }else{
        return res.status(422).json({ message: "ServiceRequestId not found in request" });
      } 
    } else {
      return res.status(401).json({ message: "Unauthorised User" });
    }
  };

  

  // public acceptableNewServiceRequestOrNot: RequestHandler = async (req,res,next
  // ): Promise<Response | void> => {
  //   if (req.params.requestId) {
  //     return this.serviceRequestService
  //       .getServiceRequestDetailById(req.params.requestId)
  //       .then((serviceRequest) => {
  //         if (serviceRequest) {
  //           req.body.ZipCode = serviceRequest.ZipCode;
  //           return this.serviceRequestService
  //             .getAllServiceRequestsOfHelper(req.body.userId)
  //             .then(async (serviceRequests) => {
  //               req.body.totalHour =
  //                 serviceRequest.ExtraHours + serviceRequest.ServiceHours;
  //               if (serviceRequests) {
  //                 const { srId, matched } =
  //                   await this.serviceRequestService.helperHasFutureSameDateAndTime(
  //                     serviceRequest.ServiceStartDate,
  //                     serviceRequests,
  //                     req.body.totalHour,
  //                     serviceRequest.ServiceStartTime
  //                   );
  //                 if (matched) {
  //                   return res.status(422).json({
  //                     message:
  //                       "Another service request " +
  //                       srId +
  //                       " has already been assigned which has time overlap with this service request. You can’t pick this one!",
  //                   });
  //                 } else {
  //                   next();
  //                 }
  //               } else {
  //                 next();
  //               }
  //             })
  //             .catch((error: Error) => {
  //               console.log(error);
  //               return res.status(500).json({ error: error });
  //             });
  //         } else {
  //           return res.status(422).json({
  //             message:
  //               "This service request is no more available. It has been assigned to another provider",
  //           });
  //         }
  //       })
  //       .catch((error: Error) => {
  //         console.log(error);
  //         return res.status(500).json({ error: error });
  //       });
  //   } else {
  //     return res
  //       .status(400)
  //       .json({ message: "proper input not found in request" });
  //   }
  // };

  // public acceptNewServiceRequest: RequestHandler = async (
  //   req,
  //   res
  // ): Promise<Response> => {
  //   return this.serviceRequestService
  //     .acceptNewServiceRequest(req.params.requestId, req.body.userId)
  //     .then((updatedServiceRequest) => {
  //       if (updatedServiceRequest[0] === 1) {
  //         return this.serviceRequestService
  //           .getHelpersByZipCode(req.body.ZipCode)
  //           .then((helpers) => {
  //             if (helpers) {
  //               for (let hp in helpers) {
  //                 if (helpers[hp].Email === req.body.email) {
  //                   continue;
  //                 }
  //                 const data = this.serviceRequestService.createData(
  //                   helpers[hp].Email!,
  //                   req.params.requestId!
  //                 );
  //                 console.log(data);
  //                 mg.messages().send(data, (error, body) => {
  //                   if (error) {
  //                     return res.json({ error: error.message });
  //                   }
  //                 });
  //               }
  //             }
  //             return res
  //               .status(200)
  //               .json({ message: "service request accepted successfully" });
  //           })
  //           .catch((error: Error) => {
  //             console.log(error);
  //             return res.status(500).json({ error: error });
  //           });
  //       } else {
  //         return res
  //           .status(404)
  //           .json({ message: "error in accepting service request" });
  //       }
  //     })
  //     .catch((error: Error) => {
  //       console.log(error);
  //       return res.status(500).json({ error: error });
  //     });
  // };
}
