import { Request, Response, RequestHandler } from "express";
import { DashboardService } from "./dashboard.service";
import mailgun from "mailgun-js";
import { ServiceRequest } from "../../models/servicerequest";

require("dotenv").config();

const DOMAIN: string = process.env.MAILGUN_DOMAIN!;
const mg = mailgun({
  apiKey: process.env.MAILGUN_API!,
  domain: DOMAIN,
});

export class DashboardController {
  public constructor(private readonly dashboardService: DashboardService) {
    this.dashboardService = dashboardService;
  }

  public getServiceRequest: RequestHandler = async (
    req,
    res
  ): Promise<Response> => {
    console.log(req.body);
    let request: ServiceRequest[] = [];
    if (req.body.userTypeId === 4) {
      return this.dashboardService
        .getAllServiceRequestByUserId(req.body.userId)
        .then((serviceRequest) => {
          if (serviceRequest) {
            if (serviceRequest.length > 0) {
              return res.status(200).json(serviceRequest);
            } else {
              return res
                .status(404)
                .json({ message: "No pending service request found" });
            }
          } else {
            return res
              .status(404)
              .json({ message: "No service request found for this user" });
          }
        })
        .catch((error: Error) => {
          console.log(error);
          return res.status(500).json({
            error: error,
          });
        });
    } else {
      return res.status(401).json({ message: "Unauthorised User" });
    }
  };

  public getServiceRequestDetailById: RequestHandler = async (
    req,
    res
  ): Promise<Response> => {
    console.log(req.body);
    const Id = parseInt(req.params.id);
    if (req.body.userTypeId === 4) {
      return this.dashboardService
        .getServiceRequestDetailById(Id)
        .then((serviceRequestDetail) => {
          if (serviceRequestDetail?.UserId === req.body.userId) {
            return res.status(200).json(serviceRequestDetail);
          } else {
            return res.status(404).json({
              message: "No service request detail found for this request",
            });
          }
        })
        .catch((error: Error) => {
          console.log(error);
          return res.status(500).json({
            error: error,
          });
        });
    } else {
      return res.status(401).json({ message: "Unauthorised User" });
    }
  };

  public rescheduleService: RequestHandler = async (req,res,next): Promise<Response | undefined> => {
    const serviceId = req.params.serviceId;
    const isGreater = this.dashboardService.compareDateWithCurrentDate(req.body.date
    );
    if (isGreater) {
      if (req.body.userTypeId === 4) {
        return this.dashboardService
          .getServiceRequestDetailById(parseInt(serviceId))
          .then((serviceRequest) => {
            if (serviceRequest) {
              req.body.totalHour =
                serviceRequest.ExtraHours + serviceRequest.ServiceHours;
              if (serviceRequest.UserId === req.body.userId) {
                if (serviceRequest.ServiceProviderId) {
                  req.body.spId = serviceRequest.ServiceProviderId;
                  return this.dashboardService
                    .getServiceRequestOfHelper(serviceRequest.ServiceProviderId)
                    .then(async (serviceRequest) => {
                      if (serviceRequest) {
                        const { srDate, matched, startTime, endTime } =
                          await this.dashboardService.helperHasFutureSameDateAndTime(
                            req.body.date,
                            serviceRequest,
                            req.body.totalHour,
                            req.body.time
                          );
                        if (matched) {
                          return res.status(200).json({
                              message:
                                "Another service request has been assigned to the service provider on " + srDate +" from " + startTime +
                                " to " + endTime +". Either choose another date or pick up a different time slot.",
                            });
                        } else {
                          next();
                        }
                      } else {
                        next();
                      }
                    })
                    .catch((error: Error) => {
                      console.log(error);
                      return res.status(500).json({
                        error: error,
                      });
                    });
                } else {
                  next();
                }
              } else {
                return res.status(404).json({ message: "No data found" });
              }
            } else {
              return res.status(404).json({ message: "Service request not found" });
            }
          })
          .catch((error: Error) => {
            console.log(error);
            return res.status(500).json({
              error: error,
            });
          });
      } else {
        return res.status(401).json({ message: "Unauthorised User" });
      }
    } else {
      return res.status(400).json({ message: "Enter future date for reschedule service request" });
    }
  };

  public rescheduleIfTimeSlotNotConflicts: RequestHandler = async (req,res): Promise<Response> => {
    const d: string = req.body.date;
    const date = d.split("-").reverse().join("-");
    const { spId } = req.body;
    if (req.params.serviceId) {
      return this.dashboardService
        .rescheduleServiceRequest(new Date(date),req.body.time,parseInt(req.params.serviceId),req.body.userId)
        .then((serviceRequest) => {
          if (serviceRequest.length > 0) {
            if (spId) {
              return this.dashboardService
                .getHelperById(spId)
                .then((helper) => {
                  if (helper?.Email) {
                    const data = this.dashboardService.createData(
                      d,
                      req.body.time,
                      helper.Email,
                      req.params.serviceId
                    );
                    mg.messages().send(data, function (error, body) {
                      if (error) {
                        return res.json({
                          error: error.message,
                        });
                      }
                    });
                    return res.status(200).json({
                        message: "sevice request reschedule successfully",
                      });
                  } else {
                    return res.status(404).json({ message: "helper not found" });
                  }
                })
                .catch((error: Error) => {
                  console.log(error);
                  return res.status(500).json({
                    error: error,
                  });
                });
            }
            return res.status(200).json({ message: "sevice request reschedule successfully" });
          } else {
            return res.status(422).json({ message: "error in rescheduling service request" });
          }
        })
        .catch((error: Error) => {
          console.log(error);
          return res.status(500).json({
            error: error,
          });
        });
    } else {
      return res.status(404).json({ message: "service request id not found" });
    }
  };

  public cancelServiceRequest: RequestHandler = async (req,res): Promise<Response | void> => {
    const { srId } = req.params;
    if (srId) {
      return this.dashboardService
        .getServiceRequestDetailById(parseInt(srId))
        .then((serviceRequest) => {
          if (serviceRequest) {
            if (serviceRequest.Status === 4) {
              return res.status(201)
                .json({ message: "service request already canceled" });
            }else if (serviceRequest.Status === 3) {
              return res.status(201)
                .json({ message: "completed service request can not canceled" });
            } else {
              if (serviceRequest.UserId === req.body.userId) {
                return this.dashboardService
                  .updateServiceRequestStatus(parseInt(srId),parseInt(req.body.userId))
                  .then((servicerequest) => {
                    if (servicerequest.length > 0) {
                      if (serviceRequest.ServiceProviderId) {
                        return this.dashboardService
                          .getHelperById(serviceRequest.ServiceProviderId)
                          .then((helper) => {
                            if (helper?.Email) {
                              const data = this.dashboardService.cancelRequestData(
                                helper.Email,srId);
                              mg.messages().send(data, function (error, body) {
                                if (error) {
                                  return res.json({
                                    error: error.message,
                                  });
                                }
                              });
                              return res.status(200).json({
                                  message:
                                    "service request cancelled successfully",
                                });
                            } else {
                              return res.status(404).json({ message: "helper not found" });
                            }
                          })
                          .catch((error: Error) => {
                            console.log(error);
                            return res.status(500).json({
                              error: error,
                            });
                          });
                      } else {
                        return res.status(201).json({
                            message: "service request cancelled successfully",
                          });
                      }
                    } else {
                      return res.status(422).json({
                          message: "error in canceling service request",
                        });
                    }
                  })
                  .catch((error: Error) => {
                    console.log(error);
                    return res.status(500).json({
                      error: error,
                    });
                  });
              } else {
                return res.status(401).json({ message: "unauthorised user" });
              }
            }
          } else {
            return res.status(404).json({ message: "service request not found" });
          }
        })
        .catch((error: Error) => {
          console.log(error);
          return res.status(500).json({
            error: error,
          });
        });
    } else {
      return res.status(404).json({ message: "service request id not found" });
    }
  };
}

// { email: 'yashvantdesai7@gmail.com', userId: 1, userTypeId: 4 }
