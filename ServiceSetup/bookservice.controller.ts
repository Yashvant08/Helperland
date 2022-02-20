import { Request, Response, RequestHandler } from "express";
import { UserAddress } from "../models/useraddress";
import { User } from "../models/user";
import { BookService } from "./bookservice.service";
import { db } from "../models";
import jwt from "jsonwebtoken";
import mailgun from "mailgun-js";

let email: string[] = [];
require("dotenv").config();

const DOMAIN: string = process.env.MAILGUN_DOMAIN!;
const mg = mailgun({
  apiKey: process.env.MAILGUN_API!,
  domain: DOMAIN,
});

export class BookServiceController {
  public constructor(private readonly bookService: BookService) {
    this.bookService = bookService;
  }

  public checkAvailibility: RequestHandler = async (
    req,
    res
  ): Promise<Response> => {
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
              jwt.verify(req.headers.authorization!,process.env.SECRET_KEY!,(err,user:any) => {
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
                      .cookie("token", token, { httpOnly: true });
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
    let address: UserAddress[] = [];
    if (req.headers.authorization) {
      jwt.verify(
        req.headers.authorization,
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
    if (req.headers.authorization) {
      jwt.verify(
        req.headers.authorization,
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
    const token = req.headers.authorization;
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
                next();
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
  };

  public CreateServiceRequest: RequestHandler = async (req, res, next) => {
    const token = req.headers.authorization;
    req.body.Status = 1;
    req.body.ServiceHourlyRate = 18;
    req.body.ExtraHours = req.body.ExtraService.length * 0.5;
    req.body.SubTotal = this.bookService.getSubTotal(
      req.body.ServiceHourlyRate,
      req.body.ServiceHours
    );
    req.body.TotalCost = this.bookService.getTotalCost(
      req.body.ExtraService,
      req.body.SubTotal
    );
    req.body.ServiceRequestAddress.Email = req.body.Email;
    return this.bookService
      .getUserByEmail(req.body.Email)
      .then((user) => {
        if (user) {
          if (user.UserTypeId === 4) {
            req.body.UserId = user.UserId;
            req.body.ModifiedBy = user.UserId;
          } else {
            return res.status(401).json({ message: "unauthorised user" });
          }
        } else {
          return res.status(404).json("User not found");
        }
        return this.bookService
          .createServiceRequestWithAddress(req.body)
          .then((request) => {
            if (request) {
              return this.bookService
                .getHelpersByZipCode(request.ZipCode)
                .then(async (user) => {
                  if (user.length > 0) {
                    for (let count in user) {
                      email.push(user[count].Email!);
                    }
                    for (let e in email) {
                      console.log(email[e]);
                      const data = await this.bookService.createDataForAll(
                        email[e]
                      );
                      await mg.messages().send(data, function (error, body) {
                        if (error) {
                          return res.json({
                            error: error.message,
                          });
                        }
                      });
                    }
                    return res
                      .status(200)
                      .json({ message: "service book successfully" });
                  } else {
                    return res.status(404).json({ message: "user not found" });
                  }
                })
                .catch((error: Error) => {
                  console.log(error);
                  return res.status(500).json({
                    error: error,
                  });
                });
            } else {
              return res.status(500).json({ message: "error" });
            }
          })
          .catch((error: Error) => {
            console.log(error);
            return res.status(500).json({
              error: error,
            });
          });
      })
      .catch((error: Error) => {
        console.log(error);
        return res.status(500).json({
          error: error,
        });
      });
  };

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

  public getFavoriteAndBlocked: RequestHandler = async (req,res):Promise<Response | undefined> => {
    if (req.headers.authorization) {
      jwt.verify(req.headers.authorization,process.env.SECRET_KEY!,(error, user: any) => {
          if (error) {
            return res
              .status(401)
              .json({ message: "invalid or expired token" });
          } else {
            return this.bookService
              .getUserByEmail(user.userEmail)
              .then((user) => {
                if (user === null) {
                  return res.status(404).json({ message: "user not found" });
                } else {
                  return this.bookService
                    .getFavoriteAndBlocked(user.UserId)
                    .then(async (user) => {
                      let sp = [];
                      if (user === null) {
                        return res
                          .status(404)
                          .json({ message: "user not found" });
                      } else {
                        let favoriteSP = await this.bookService.getTargetUser(
                          user
                        );
                        if (favoriteSP.length > 0) {
                          return this.bookService
                            .getUserById(favoriteSP)
                            .then((helper) => {
                              return res.status(200).json(helper);
                            })
                            .catch((error) => {
                              console.log(error);
                              return res.status(500).json({
                                error: error,
                              });
                            });
                        } else {
                          return res
                            .status(404)
                            .json({ message: "favorite helper not found" });
                        }
                      }
                    })
                    .catch((error) => {
                      console.log(error);
                      return res.status(500).json({
                        error: error,
                      });
                    });
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
    } else {
      return res.status(401).json({ message: "invalid or expired token" });
    }
  };
}
