import { Request, Response, RequestHandler } from "express";
import { ServiceHistoryService } from "./servicehistory.service";
import mailgun from "mailgun-js";
import exceljs from "exceljs";


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

  public exportDataInExcelFormat:RequestHandler = async(req, res):Promise<Response|void> => {
    let exportHistory = [];
    return this.serviceHistoryService.getServiceRequestHistoryOfUser(parseInt(req.body.userId))
    .then(async requestHistory => {
      if(requestHistory){
        if(requestHistory.length>0){
          const pastDateHistory = this.serviceHistoryService.compareDateWithCurrentDate(requestHistory);
          if(requestHistory.length>0){
            exportHistory = await this.serviceHistoryService.getDatForExport(pastDateHistory);
            let workbook = new exceljs.Workbook();
            let worksheet = workbook.addWorksheet("history");
            worksheet.columns = [
              { header: "ServiceId" ,        key: "ServiceId", width: 10 },
              { header: "StartDate" ,        key: "StartDate", width: 25 },
              { header: "ServiceProvider" ,  key: "ServiceProvider" , width: 25 },
              { header: "Payment"   ,        key: "Payment"  , width: 10 },
              { header: "Status"   ,         key: "Status"  , width: 15 }
            ];
            worksheet.addRows(exportHistory);
            res.setHeader(
              "Content-Type",
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            );
            res.setHeader(
              "Content-Disposition",
              "attachment; filename=" + "history.xlsx"
            ); 
              const data = await workbook.xlsx.writeFile(`../history.xlsx`)
               .then(() => {
                 res.send({
                   status: "success",
                   message: "file successfully downloaded"
                  });
               });
            
            // return workbook.xlsx.write(res).then(function (err) {
            //   res.status(200).end();
            // });
          }else{
            return res.status(404).json({message:'No data to export 1'});
          }
        }else{
          return res.status(404).json({message:'No data to export 2'});
        }
      }else{
        return res.status(404).json({message:'No data to export 3'});
      }
    })
    .catch((error: Error) => {
      console.log(error);
      return res.status(500).json({error: error});
    });
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

