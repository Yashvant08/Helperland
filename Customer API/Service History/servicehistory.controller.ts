import { Request, Response, RequestHandler } from "express";
import { UserAddress } from "../../models/useraddress";
import { User } from "../../models/user";
import { ServiceHistoryService } from "./servicehistory.service";
import { db } from "../../models";
import jwt from "jsonwebtoken";
import mailgun from "mailgun-js";
import { ServiceRequest } from "../../models/servicerequest";
import moment from "moment";

require("dotenv").config();

const DOMAIN: string = process.env.MAILGUN_DOMAIN!;
const mg = mailgun({
  apiKey: process.env.MAILGUN_API!,
  domain: DOMAIN,
});

export class ServiceHistoryController {
  public constructor(private readonly serviceHistoryService: ServiceHistoryService) {
    this.serviceHistoryService = serviceHistoryService;
  }

  public getCancelledOrCompletedSR:RequestHandler = async(req, res):Promise<Response> => {
    return this.serviceHistoryService.getServiceRequestHistoryOfUser(parseInt(req.body.userId))
    .then(requestHistory => {
      if(requestHistory){
        if(requestHistory.length>0){
          const pastDateHistory = this.serviceHistoryService.compareDateWithCurrentDate(requestHistory);
          if(requestHistory.length>0){
            return res.status(200).json(pastDateHistory);
          }else{
            return res.status(404).json({message:'Service request history not found in past'});
          }
        }else{
          return res.status(404).json({message:'Service request history not found'});
        }
      }else{
        return res.status(404).json({message:'Service request history not found'});
      }
    })
    .catch((error: Error) => {
      console.log(error);
      return res.status(500).json({
        error: error,
      });
    });
  };


  public getServiceRequestDetailById: RequestHandler = async (req,res): Promise<Response> => {
    console.log(req.body);
    const Id = parseInt(req.params.id);
    if (req.body.userTypeId === 4) {
      return this.serviceHistoryService
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


  public rateServiceProvider: RequestHandler = async (req,res): Promise<Response> => {
    const serviceId = parseInt(req.params.serviceId);
    req.body.RatingDate = new Date();
    return this.serviceHistoryService.getRatingsByServiceRequestId(serviceId)
    .then(ratings => {
      if(ratings){
        return res.status(201).json({message:'ratings already set for this service request'});
      }else{
        if(req.params.serviceId){
          return this.serviceHistoryService.getServiceRequestDetailById(serviceId)
          .then(serviceRequest => {
            if(serviceRequest){
              req.body.ServiceRequestId = serviceRequest.ServiceRequestId;
              if(req.body.userTypeId === 4 && req.body.userId === serviceRequest.UserId){
                req.body.RatingFrom = serviceRequest.UserId;
                if(serviceRequest.Status === 3 && serviceRequest.ServiceProviderId){
                  req.body.RatingTo = serviceRequest.ServiceProviderId;
                  req.body.Ratings = this.serviceHistoryService.getRatings(req.body);
                  console.log(req.body);
                  return this.serviceHistoryService.setRatings(req.body)
                  .then(rating => {
                    return res.status(200).json(rating);
                  })
                  .catch((error: Error) => {
                    console.log(error);
                    return res.status(500).json({
                      error: error,
                    });
                  });
                }else{
                  return res.status(400).json({message:'service request not completed or service provider not found'});
                }
              }else{
                return res.status(401).json({message:'unauthorised user'});
              }
            }else{
              return res.status(404).json({message:'srvice request not found'});
            }
          })
          .catch((error: Error) => {
            console.log(error);
            return res.status(500).json({
              error: error,
            });
          })
        }else{
          return res.status(404).json({message:'srvice request id not found'});
        }
      }
    })
    .catch((error: Error) => {
      console.log(error);
      return res.status(500).json({
        error: error,
      });
    });   
  };

}

