import { Request, Response, RequestHandler } from "express";
import { FavoriteProsService } from "./favorite-pros.service";
import mailgun from "mailgun-js";

require("dotenv").config();

const DOMAIN: string = process.env.MAILGUN_DOMAIN!;
const mg = mailgun({
  apiKey: process.env.MAILGUN_API!,
  domain: DOMAIN,
});

export class FavoriteProsController {
  public constructor(
    private readonly favoriteProsService: FavoriteProsService
  ) {
    this.favoriteProsService = favoriteProsService;
  }

  public getAllHelperWorkedWithCustomer: RequestHandler = async (
    req,
    res
  ): Promise<Response> => {
    if (req.body.userId && req.body.userTypeId === 4) {
      return this.favoriteProsService
        .getAllServiceRequestByUserId(req.body.userId)
        .then((serviceRequest) => {
          const helperId =
            this.favoriteProsService.getAllHelperIdWorkedWithCustomerInPast(
              serviceRequest
            );
          if (helperId.length > 0) {
            return this.favoriteProsService
              .getAllHelperWorkedWithCustomerInPast(helperId)
              .then((helpers) => {
                if (helpers && helpers.length > 0) {
                  return res.status(200).json(helpers);
                } else {
                  return res.status(404).json({
                    message:
                      "no service provider found worked with customer in past",
                  });
                }
              })
              .catch((error: Error) => {
                console.log(error);
                return res.status(500).json({ error: error });
              });
          } else {
            return res.status(404).json({
              message: "no service provider found worked with customer in past",
            });
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

  public createFavoriteHelper: RequestHandler = async (
    req,
    res,
    next
  ): Promise<Response | void> => {
    const userId = parseInt(req.body.userId);
    const helperId = parseInt(req.params.helperId);

    if (req.body.userId && req.body.userTypeId === 4) {
      req.body.UserId = userId;
      req.body.TargetUserId = helperId;
      return this.favoriteProsService
        .getAllServiceRequestByUserId(req.body.userId)
        .then((serviceRequest) => {
          const helperIds =
            this.favoriteProsService.getAllHelperIdWorkedWithCustomerInPast(
              serviceRequest
            );
          if (helperIds.length > 0) {
            const inHelperArray = helperIds.includes(
              parseInt(req.params.helperId)
            );
            if (inHelperArray) {
              if (req.body.IsFavorite) {
                return this.favoriteProsService
                  .getFavoriteHelper(userId, helperId)
                  .then((favorite) => {
                    if (favorite) {
                      if (favorite.IsFavorite) {
                        return res
                          .status(409)
                          .json({
                            message: "helper already in you favorite list",
                          });
                      } else {
                        return this.favoriteProsService
                          .updateFavoriteHelper(req.body)
                          .then((favorite) => {
                            if (favorite.length > 0) {
                              res
                                .status(201)
                                .json({
                                  message:
                                    "favorite helper updated successfully",
                                });
                            } else {
                              res.status(502).json({
                                message: "error in creating favorite helper",
                              });
                            }
                          })
                          .catch((error: Error) => {
                            console.log(error);
                            return res.status(500).json({ error: error });
                          });
                      }
                    } else {
                      req.body.IsBlocked = false;
                      return this.favoriteProsService
                        .createFavoriteHelper(req.body)
                        .then((favoriteHelper) => {
                          if (favoriteHelper) {
                            return res
                              .status(200)
                              .json({
                                message: "favorite helper created successfully",
                              });
                          }
                          return res.status(502).json({
                            message: "error in creating favorite helper",
                          });
                        })
                        .catch((error: Error) => {
                          console.log(error);
                          return res.status(500).json({ error: error });
                        });
                    }
                  })
                  .catch((error: Error) => {
                    console.log(error);
                    return res.status(500).json({ error: error });
                  });
              } else if (req.body.IsFavorite === false) {
                next();
              } else {
                return res.status(404).json({ message: "content not found" });
              }
            } else {
              return res.status(404).json({
                message:
                  "this service provider has not worked with customer in past",
              });
            }
          } else {
            return res.status(404).json({
              message: "no service provider found worked with customer in past",
            });
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

  public removeFavoriteHelper: RequestHandler = async (req,res): Promise<Response|void> => {
    return this.favoriteProsService
      .getFavoriteHelper(req.body.UserId, req.body.TargetUserId)
      .then((favorite) => {
        if (favorite) {
          if (favorite.IsFavorite) {
            return this.favoriteProsService
              .updateFavoriteHelper(req.body)
              .then(favoriteStatus => {
                if (favoriteStatus) {
                  res
                    .status(201)
                    .json({ message: "favorite helper updated successfully" });
                } else {
                  res.status(502).json({
                    message: "error in updating favorite helper",
                  });
                }
              })
              .catch((error: Error) => {
                console.log(error, 'hi');
                return res.status(500).json({ error: error });
              });
          }else if(favorite.IsFavorite === false){
            return res.status(409).json({message:'helper already in unfavorite list'});
          } else {
            return res
              .status(404)
              .json({ message: "no helper to remove from favorite list" });
          }
        } else {
          return res
            .status(404)
            .json({ message: "no helper in you favorite list" });
        }
      })
      .catch((error: Error) => {
        console.log(error);
        return res.status(500).json({ error: error });
      });
  };

  public blockHelper:RequestHandler = async(req, res, next):Promise<Response|void> => {
    if (req.body.userId && req.body.userTypeId === 4) {
      req.body.UserId = req.body.userId;
      req.body.TargetUserId = req.params.helperId;
      return this.favoriteProsService
        .getAllServiceRequestByUserId(req.body.userId)
        .then((serviceRequest) => {
          const helperIds =
            this.favoriteProsService.getAllHelperIdWorkedWithCustomerInPast(serviceRequest);
          if (helperIds.length > 0) {
            const inHelperArray = helperIds.includes(
              parseInt(req.params.helperId)
            );
            if (inHelperArray) {
              if (req.body.IsBlocked) {
                return this.favoriteProsService
                  .getFavoriteHelper(req.body.UserId, req.body.TargetUserId)
                  .then((fAndBHelper) => {
                    if (fAndBHelper) {
                      if(fAndBHelper.IsBlocked){
                        return res
                          .status(409)
                          .json({message: "helper already in you blocked list"});
                      }else{
                        return this.favoriteProsService.updateBlockedHelper(req.body)
                        .then(updatedHelper => {
                          if (updatedHelper.length > 0) {
                            res
                              .status(201)
                              .json({
                                message:
                                  "helper added in blocked list",
                              });
                          } else {
                            res.status(502).json({
                              message: "error in adding helper in blocked list",
                            });
                          }
                        })
                        .catch((error: Error) => {
                          console.log(error);
                          return res.status(500).json({ error: error });
                        });
                      }
                    } else {
                      req.body.IsFavorite = false;
                      return this.favoriteProsService
                        .createFavoriteHelper(req.body)
                        .then((blockedHelper) => {
                          if (blockedHelper) {
                            return res
                              .status(200)
                              .json({
                                message: "blocked helper created successfully",
                              });
                          }
                          return res.status(502).json({
                            message: "error in creating blocked helper",
                          });
                        })
                        .catch((error: Error) => {
                          console.log(error);
                          return res.status(500).json({ error: error });
                        });
                    }
                  })
                  .catch((error: Error) => {
                    console.log(error);
                    return res.status(500).json({ error: error });
                  });
                
              } else if (req.body.IsBlocked === false) {
                next();
              } else {
                return res.status(404).json({ message: "content not found" });
              }
            } else {
              return res.status(404).json({
                message:
                  "this service provider has not worked with customer in past",
              });
            }
          } else {
            return res.status(404).json({
              message: "no service provider found worked with customer in past",
            });
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

  public removeBlockedHelper:RequestHandler = async(req, res):Promise<Response|void> => {
    return this.favoriteProsService
      .getFavoriteHelper(req.body.UserId, req.body.TargetUserId)
      .then((blocked) => {
        if (blocked) {
          if (blocked.IsBlocked) {
            return this.favoriteProsService
              .updateBlockedHelper(req.body)
              .then(blockedStatus => {
                if (blockedStatus.length>0) {
                  res
                    .status(200)
                    .json({ message: "helper removed from blocked list" });
                } else {
                  res.status(502).json({
                    message: "error in removing helper from blocked list",
                  });
                }
              })
              .catch((error: Error) => {
                console.log(error, 'hi');
                return res.status(500).json({ error: error });
              });
          }else if(blocked.IsBlocked === false){
            return res.status(401).json({message:'helper already in unblocked list'});
          } else {
            return res
              .status(404)
              .json({ message: "no helper to remove from blocked list" });
          }
        } else {
          return res
            .status(404)
            .json({ message: "no helper in you favorite list" });
        }
      })
      .catch((error: Error) => {
        console.log(error);
        return res.status(500).json({ error: error });
      });
  }
}
