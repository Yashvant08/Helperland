import { Request, Response, RequestHandler } from "express";
import { UserAddress } from "../models/useraddress";
import { BookService } from "./bookservice.service";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer"
// import mailgun from "mailgun-js";

let email: string[] = [];
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



export class BookServiceController {
  public constructor(private readonly bookService: BookService) {
    this.bookService = bookService;
  }

  public checkAvailibility: RequestHandler = async (
    req,
    res
  ): Promise<Response> => {
    const token = req.headers.authorization! || req.header('auth')!;
    let zipCode = [];
    if (!req.body.postalcode) {
      return res.status(400).json({ message: "No ZipCode Entered" });
    } else {
      return this.bookService
        .getAllHelper()
        .then((helpers) => {
          let isAvailable;
          if (helpers) {
            for (let pc in helpers) {
              if (helpers[pc].ZipCode === req.body.postalcode) {
                isAvailable = true;
              }
            }
            if (isAvailable) {
              jwt.verify(token,process.env.SECRET_KEY!,(err,user:any) => {
                  if (err) {
                    return res
                      .status(401)
                      .json({ message: "invalid or expired token" });
                  } else {
                    const userEmail = user.userEmail;
                    const postalCode = req.body.postalcode;
                    const token = this.bookService.createToken(
                      userEmail,
                      postalCode
                    );
                    return res
                      .status(200)
                      .setHeader("token", token);
                      // .cookie("token", token, { httpOnly: true });
                  }
                }
              );
              return res.status(200).json({ message: "found" });
            } else {
              return res.status(404).json({
                message:
                  "We are not providing service in this area. We will notify you if any helper would start working near your area.",
              });
            }
          } else {
            return res.status(301).json({ message: "No helper found" });
          }
        })
        .catch((error: Error) => {
          console.log(error);
          return res.status(500).json({
            error: error,
          });
        });
    }
  };

  public getUserAddresses: RequestHandler = async (
    req,
    res
  ): Promise<Response | undefined> => {
    const token = req.headers.authorization! || req.header('auth')!;
    let address: UserAddress[] = [];
    if (token) {
      jwt.verify(
        token,
        process.env.SECRET_KEY!,
        (error, user: any) => {
          if (error) {
            return res
              .status(401)
              .json({ message: "invalid or expired token" });
          } else {
            return this.bookService
              .getUserByEmail(user.userEmail)
              .then((userByEmail) => {
                if (userByEmail) {
                  return this.bookService
                    .getUserAddress(userByEmail.UserId)
                    .then((users) => {
                      if (users.length > 0) {
                        for (let us in users) {
                          if (users[us].PostalCode === user.postalCode) {
                            address.push(users[us]);
                          }
                        }
                        if (address.length > 0) {
                          return res.status(200).json(address);
                        } else {
                          return res
                            .status(401)
                            .json({ message: "Addresses not found" });
                        }
                      } else {
                        return res
                          .status(401)
                          .json({ message: "User Addresses not found" });
                      }
                    })
                    .catch((error: Error) => {
                      console.log(error);
                      return res.status(500).json({
                        error: error,
                      });
                    });
                } else {
                  return res.status(301).json("user not fund");
                }
              })
              .catch((error: Error) => {
                console.log(error);
                return res.status(500).json({
                  error: error,
                });
              });
          }
        }
      );
    } else {
      return res.status(401).json({ message: "invalid or expired token" });
    }
  };

  public createUserAddress: RequestHandler = async (req, res) => {
    const token = req.headers.authorization || req.header('auth');
    if (token) {
      jwt.verify(
        token,
        process.env.SECRET_KEY!,
        (error, user: any) => {
          if (error) {
            return res
              .status(401)
              .json({ message: "invalid or expired token" });
          } else {
            req.body.Email = user.userEmail;
            req.body.PostalCode = user.postalCode;
            return this.bookService
              .getUserByEmail(user.userEmail)
              .then((user) => {
                if (user) {
                  req.body.UserId = user.UserId;
                  return this.bookService
                    .createUserAddress(req.body)
                    .then((address) => {
                      return res.status(200).json({ message: "Address created successfully" });
                    })
                    .catch((error) => {
                      console.log(error);
                      return res.status(500).json({
                        error: error,
                      });
                    });
                } else {
                  return res.status(404).json({ message: "user not found" });
                }
              })
              .catch((error) => {
                console.log(error);
                return res.status(500).json({
                  error: error,
                });
              });
          }
        }
      );
    }
  };

  public decodeToken: RequestHandler = async (req,res,next):Promise<Response|undefined> => {
    const token = req.headers.authorization || req.header('auth');
    const isFutureDate = await this.bookService.compareDateWithCurrentDate(req.body.ServiceStartDate);
    if(isFutureDate){
      req.body.ServiceStartDate = new Date(req.body.ServiceStartDate.toString().split('-').reverse().join('-'));
      if (token) {
        jwt.verify(token, process.env.SECRET_KEY!, (err, user: any) => {
          if (err) {
            return res.status(401).json({ message: "invalid or expired token" });
          } else {
            req.body.ZipCode = user.postalCode;
            req.body.Email = user.userEmail;
            return this.bookService
              .getUserByEmail(user.userEmail)
              .then((user) => {
                if (user?.UserTypeId === 4) {
                  if(req.body.ServiceHours <3){
                    return res.status(400).json({message:'service hours must be minimum 3 hours'});
                  }else{
                    next();
                  }
                } else {
                  return res.status(401).json({ message: "unauthorised user" });
                }
              })
              .catch((error: Error) => {
                console.log(error);
                return res.status(500).json({
                  error: error,
                });
              });
          }
        });
      } else {
        return res.status(401).json("invalid or expired token");
      }

    }else{
      return res.status(401).json({message:'enter future date for book service'});
    } 
  };

  // public CreateServiceRequest: RequestHandler = async (req, res, next):Promise<Response> => {
  //   const token = req.headers.authorization;
  //   req.body.Status = 1;
  //   req.body.ServiceHourlyRate = 18;
  //   req.body.ExtraHours = req.body.ExtraService.length * 0.5;
  //   req.body.SubTotal = this.bookService.getSubTotal(
  //     req.body.ServiceHourlyRate,
  //     req.body.ServiceHours
  //   );
  //   req.body.TotalCost = this.bookService.getTotalCost(
  //     req.body.ExtraService,
  //     req.body.SubTotal
  //   );
  //   req.body.ServiceRequestAddress.Email = req.body.Email;
  //   return this.bookService
  //     .getUserByEmail(req.body.Email)
  //     .then((user) => {
  //       if (user) {
  //         if (user.UserTypeId === 4) {
  //           req.body.UserId = user.UserId;
  //           req.body.ModifiedBy = user.UserId;
  //         } else {
  //           return res.status(401).json({ message: "unauthorised user" });
  //         }
  //       } else {
  //         return res.status(404).json("User not found");
  //       }
  //       return this.bookService
  //         .createServiceRequestWithAddress(req.body)
  //         .then((request) => {
  //           if (request) {
  //             if(request.ServiceProviderId){
  //               return this.bookService.getHelperById(request.ServiceProviderId)
  //               .then(helper => {
  //                 if(helper){
  //                   const data = this.bookService.createData(helper.Email!, request.ServiceRequestId);
  //                   transporter.sendMail(data, (error, user) => {
  //                     if(error){
  //                       return res.json({
  //                         error: error.message,
  //                       });
  //                     }
  //                   })
  //                 }else{
  //                   return res
  //                     .status(404)
  //                     .json({ message: "helper not found"});
  //                 }
  //                 return res
  //                     .status(200)
  //                     .json({ message: "service booked successfully" });
  //               })
  //               .catch((error: Error) => {
  //                 console.log(error);
  //                 return res.status(500).json({
  //                   error: error,
  //                 });
  //               });
  //             }else{
  //               return this.bookService
  //               .getHelpersByZipCode(request.ZipCode)
  //               .then(async (helper) => {
  //                 if (helper.length > 0) {
  //                   const hp = await this.bookService.removeHelperBlockedLoginCustomer(
  //                     parseInt(req.body.userId), helper
  //                   );
  //                   return this.bookService.getBlockedHelper(parseInt(req.body.userId), hp)
  //                   .then(async blockedHelper => {
  //                     if(blockedHelper){
  //                       console.log(blockedHelper);
  //                       const users = await this.bookService.removeBlockedHelper(hp,blockedHelper);
  //                     email = this.bookService.getEmailAddressForSendEmail(users, req.body);
  //                     console.log(email);
  //                     for (let e in email) {
  //                       console.log(email[e]);
  //                       const data = await this.bookService.createDataForAll(
  //                         email[e]
  //                       );
  //                       transporter.sendMail(data, function (error, body) {
  //                         if (error) {
  //                           return res.json({
  //                             error: error.message,
  //                           });
  //                         }
  //                       });
  //                     }
  //                     }
  //                       return res
  //                       .status(200)
  //                       .json({ message: "service booked successfully" });
                      
                      
  //                     })
  //                   .catch((error: Error) => {
  //                     console.log(error);
  //                     return res.status(500).json({error: error});
  //                   });
  //                 } else {
  //                   return res.status(404).json({ message: "user not found" });
  //                 }
  //               })
  //               .catch((error: Error) => {
  //                 console.log(error);
  //                 return res.status(500).json({error: error});
  //               });
  //             }
              
  //           } else {
  //             return res.status(500).json({ message: "error" });
  //           }
  //         })
  //         .catch((error: Error) => {
  //           console.log(error);
  //           return res.status(500).json({
  //             error: error,
  //           });
  //         });
  //     })
  //     .catch((error: Error) => {
  //       console.log(error);
  //       return res.status(500).json({
  //         error: error,
  //       });
  //     });
  // };

  public saveServiceRequestDetail: RequestHandler = async (req, res, next):Promise<Response> => {
    return this.bookService.saveServiceRequestDetail(req.body, req.body.email)
    .then(serviceRequest => {
      if(serviceRequest){
        return res.status(200).json(serviceRequest);
      }else{
        return res.status(422).json({message:'error in sving service request detail'});
      }
    })
    .catch((error: Error) => {
      console.log(error);
      return res.status(500).json({error: error});
    });     
};

public saveCleaningServiceDetail:RequestHandler = async (req, res):Promise<Response> => {
  if(req.body.userId && req.body.userTypeId === 4){
    if(req.body.ServiceRequestId && req.body.AddressId){
      return this.bookService.createServiceRequestAddress(req.body.ServiceRequestId,req.body.AddressId,req.body.userId)
      .then(srAddress => {
        if(srAddress){
          if(req.body.ServiceProviderId){
              return this.bookService.getHelperById(req.body.ServiceProviderId)
              .then(helper => {
                return this.bookService.completeServiceRequest(+req.body.ServiceProviderId, req.body.ServiceRequestId)
                  .then(completeSR => {
                    if(completeSR[0] ===1){
                      const data = this.bookService.createData(helper?.Email!, req.body.ServiceRequestId);
                      transporter.sendMail(data, (error, user) => {
                        if(error){
                          return res.json({error: error.message});
                        }
                      })
                      return res.status(200).json({ message: "service booked successfully"});
                    }else{
                      return res.status(422).json({message:'error in completing service request'})
                    }
                  })
                  .catch((error: Error) => {
                    console.log(error);
                    return res.status(500).json({error: error});
                  });
              })
              .catch((error: Error) => {
                console.log(error);
                return res.status(500).json({
                  error: error,
                });
              });
            }else{
              return this.bookService
              .getHelpersByZipCode(srAddress.PostalCode)
              .then(async (helper) => {
                if (helper.length > 0) {
                  const hp = await this.bookService.removeHelperBlockedLoginCustomer(
                    parseInt(req.body.userId), helper);
                  return this.bookService.getBlockedHelper(parseInt(req.body.userId), hp)
                  .then(async blockedHelper => {
                    if(blockedHelper){
                      console.log(blockedHelper);
                      const users = await this.bookService.removeBlockedHelper(hp,blockedHelper);
                    email = this.bookService.getEmailAddressForSendEmail(users, req.body);
                    console.log(email);
                    for (let e in email) {
                      console.log(email[e]);
                      const data = await this.bookService.createDataForAll(
                        email[e]
                      );
                      transporter.sendMail(data, function (error, body) {
                        if (error) {
                          return res.json({error: error.message});
                        }
                      });
                    }
                    }
                      return res.status(200)
                      .json({ message: "service booked successfully" });
                    })
                  .catch((error: Error) => {
                    console.log(error);
                    return res.status(500).json({error: error});
                  });
                } else {
                  return res.status(404).json({ message: "user not found" });
                }
              })
              .catch((error: Error) => {
                console.log(error);
                return res.status(500).json({error: error});
              });
            }
        }else{
          return res.status(401).json({message:'address already available or error in creating address or this addess id is not belongs to you'});
        }
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({ error: error });
      });
    }else{
      return res.status(404).json({message:'service request id or address id not found'});
    }
  }else{
    return res.status(401).json({message:'unauthorised user'});
  }
}

  public createFavoriteAndBlocked: RequestHandler = async (req,res): Promise<Response> => {
    return this.bookService
      .createFavoriteAndBlocked(req.body)
      .then((user) => {
        return res.status(200).json(user);
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({
          error: error,
        });
      });
  };

  public getFavoriteAndBlocked: RequestHandler = async (req,res):Promise<Response|void> => {
    const token = req.headers.authorization! || req.header('auth')!;
      jwt.verify(token,process.env.SECRET_KEY!,(error, userToken: any) => {
          if (error) {
            return res.status(401).json({ message: "invalid or expired token" });
          } else {
            if(req.body.userTypeId === 4 && req.body.userId){
              return this.bookService
                    .getFavoriteAndBlocked(req.body.userId)
                    .then(async (user) => {
                      if (user === null) {
                        return res.status(404).json({ message: "no helper in favorite list" });
                      } else {
                        let favoriteSP = await this.bookService.getTargetUser(user, userToken.postalCode);
                        if (favoriteSP.length > 0) {
                          return res.status(200).send(favoriteSP);
                        } else {
                          return res
                            .status(404)
                            .json({ message: "favorite helper not found" });
                        }
                      }
                    })
                    .catch((error) => {
                      console.log(error);
                      return res.status(500).json({ error: error });
                    });
            }else{
              return res.status(401).json({message:'unauthorised user'});
            }
          }
        }
      );
  };
}
