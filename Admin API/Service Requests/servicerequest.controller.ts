import { Request, Response, RequestHandler } from "express";
import { ServiceRequestService } from "./servicerequest.service";
import nodemailer from "nodemailer"
// import mailgun from "mailgun-js";
import { displayRequest, filters } from "./types";

require("dotenv").config();

// const DOMAIN: string = process.env.MAILGUN_DOMAIN!;
// const mg = mailgun({
//   apiKey: process.env.MAILGUN_API!,
//   domain: DOMAIN,
// });

const transporter = nodemailer.createTransport({
  service: process.env.SERVICE,
  auth: {
      user: process.env.USER,
      pass: process.env.PASS,
  },
});

export class ServiceRequestController {
  public constructor(
    private readonly serviceRequestService: ServiceRequestService
  ) {
    this.serviceRequestService = serviceRequestService;
  }

  public getAllServiceRequests: RequestHandler = async (
    req,
    res
  ): Promise<Response> => {
    if (req.body.userTypeId === 2 && req.body.userId) {
      return this.serviceRequestService
        .getAllServiceRequests()
        .then((serviceRequests) => {
          if (serviceRequests && serviceRequests.length > 0) {
            return res.status(200).json(serviceRequests);
          } else {
            return res
              .status(404)
              .json({ message: "service requests not found" });
          }
        })
        .catch((error: Error) => {
          console.log(error);
          return res.status(500).json({ error: error });
        });
    } else {
      return res.status(401).json({ message: "unauthorised user" });
    }
  };

  public filteredServiceRequests: RequestHandler = async (
    req,
    res
  ): Promise<Response> => {
    const filters: filters = req.body;
    if (req.body.userTypeId === 2) {
      return this.serviceRequestService
        .getAllServiceRequests()
        .then(async (serviceRequests) => {
          if (serviceRequests && serviceRequests.length > 0) {
            const filteredArray = await this.serviceRequestService.filterData(
              serviceRequests,
              filters
            );
            return res.status(200).json(filteredArray);
          } else {
            return res
              .status(404)
              .json({ message: "service requests not found" });
          }
        })
        .catch((error: Error) => {
          console.log(error);
          return res.status(500).json({ error: error });
        });
    } else {
      return res.status(401).json({ message: "Unauthorised User" });
    }
  };

  public cancelServiceRequest: RequestHandler = async (
    req,
    res
  ): Promise<Response> => {
    if (req.body.userTypeId === 2) {
      if (req.params.requestId) {
        return this.serviceRequestService
          .getServiceRequestById(req.params.requestId)
          .then(async (serviceRequest) => {
            if (serviceRequest) {
              if (serviceRequest.Status === 3) {
                return res
                  .status(401)
                  .json({
                    message: "completed service request can not cancel.",
                  });
              } else if (serviceRequest.Status === 4) {
                return res
                  .status(401)
                  .json({ message: "service request already cancelled." });
              } else if (serviceRequest.Status === 5) {
                return res
                  .status(401)
                  .json({ message: "service request already refunded." });
              } else {
                return this.serviceRequestService
                  .updateServiceRequest(req.params.requestId, req.body.userId)
                  .then(async (updatedServiceRequest) => {
                    if (updatedServiceRequest[0] === 1) {
                      const email =
                        await this.serviceRequestService.getEmailAddressOfCustAndSP(
                          serviceRequest
                        );
                      console.log(email);
                      for (let e in email) {
                        const data = this.serviceRequestService.createData(
                          email[e],
                          serviceRequest.ServiceRequestId
                        );
                        transporter.sendMail(data, (error, body) => {
                          if (error) {
                            return res.json({ error: error.message });
                          }
                        });
                      }
                      return res
                        .status(200)
                        .json({
                          message: "service request cancelled successfully.",
                        });
                    } else {
                      return res
                        .status(422)
                        .json({ message: "errr in cancelling request." });
                    }
                  })
                  .catch((error: Error) => {
                    console.log(error);
                    return res.status(500).json({ error: error });
                  });
              }
            } else {
              return res
                .status(200)
                .json({ message: "service request not found" });
            }
          })
          .catch((error: Error) => {
            console.log(error);
            return res.status(500).json({ error: error });
          });
      } else {
        return res
          .status(422)
          .json({ message: "ServiceRequestId not found in request" });
      }
    } else {
      return res.status(401).json({ message: "Unauthorised User" });
    }
  };

  public editServiceRequest: RequestHandler = async (req,res,next): Promise<Response|void> => 
  {
    if (req.body.userTypeId === 2) {
      if (req.body.ServiceRequestId) {
        return this.serviceRequestService
          .getServiceRequestById(req.body.ServiceRequestId)
          .then(async (serviceRequest) => {
            if (serviceRequest) {
              req.body.serviceRequest = serviceRequest;
              if (serviceRequest.Status === 1 || serviceRequest.Status === 2) {
                return this.serviceRequestService
                  .updateServiceRequestAddress(req.body)
                  .then(async (updatedRequest) => {
                    if (updatedRequest) {
                      if (updatedRequest[0] === 1) {
                        req.body.updatedAddress = true;
                        next();
                      } else {
                        return res.status(422).json({ message: "error in updating address" });
                      }
                    } else {
                      req.body.updatedAddress = false;
                      next();
                    }
                  })
                  .catch((error: Error) => {
                    console.log(error);
                    return res.status(500).json({ error: error });
                  });
              } else {
                return res.status(401).json({
                  message:
                    "completed or cancelled service request can not edit or reschedule.",
                });
              }
            } else {
              return res.status(200).json({ message: "service request not found" });
            }
          })
          .catch((error: Error) => {
            console.log(error);
            return res.status(500).json({ error: error });
          });
      } else {
        return res.status(422).json({ message: "ServiceRequestId not found" });
      }
    } else {
      return res.status(401).json({ message: "Unauthorised User" });
    }
  };

  public rescheduleServiceRequest:RequestHandler = async(req, res):Promise<Response> =>
  {
    const isSame = await this.serviceRequestService.checkIfRescheduleDateIsSame(req.body);
    if(isSame === false){
      const isGreater = this.serviceRequestService.compareDateWithCurrentDate(req.body.ServiceStartDate);
        if (isGreater) {
          return this.serviceRequestService.rescheduleServiceRequest(req.body, req.body.userId)
          .then(async rescheduledServiceRequest => {
            if(rescheduledServiceRequest[0] === 1){
              const email = await this.serviceRequestService.getEmailAddressOfCustAndSP(req.body.serviceRequest);
              if(req.body.updatedAddress){
                  for (let e in email) {
                    const data = this.serviceRequestService.createDataForUpdatedServiceRequest(email[e],req.body);
                    transporter.sendMail(data, (error, body) => {
                      if (error) {
                        return res.json({ error: error.message });
                      }
                    });
                  }
              }else{
                for (let e in email) {
                  const data = this.serviceRequestService.createDataForRescheduleSR(email[e],req.body);
                  transporter.sendMail(data, (error, body) => {
                    if (error) {
                      return res.json({ error: error.message });
                    }
                  });
                }
              }
              return res.status(200).json({message:'service request updated successfully.'});
            }else{
              return res.status(422).json({ message: "error in rescheduling service request"});
            }
          })
          .catch((error: Error) => {
            console.log(error);
            return res.status(500).json({ error: error });
          })
        } else {
          return res.status(400).json({ message: "Enter future date for reschedule service request" });
        }
    }else{
      if(req.body.updatedAddress){
        const email = await this.serviceRequestService.getEmailAddressOfCustAndSP(req.body.serviceRequest);
          for (let e in email) {
            const data = this.serviceRequestService.createDataForUpdatedAddress(email[e],req.body);
            transporter.sendMail(data, (error, body) => {
              if (error) {
                return res.json({ error: error.message });
              }
            });
          }
          return res.status(200).json({message:'service request address updated successfully.'})
      }else{
        return res.status(201).json({message:'no change in service request.'});
      }
    }  
  }
}
