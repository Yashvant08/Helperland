"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookServiceController = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var mailgun_js_1 = __importDefault(require("mailgun-js"));
var email = [];
require("dotenv").config();
var DOMAIN = process.env.MAILGUN_DOMAIN;
var mg = (0, mailgun_js_1.default)({
    apiKey: process.env.MAILGUN_API,
    domain: DOMAIN,
});
var BookServiceController = /** @class */ (function () {
    function BookServiceController(bookService) {
        var _this = this;
        this.bookService = bookService;
        this.checkAvailibility = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var token, zipCode;
            var _this = this;
            return __generator(this, function (_a) {
                token = req.headers.authorization || req.header('auth');
                zipCode = [];
                if (!req.body.postalcode) {
                    return [2 /*return*/, res.status(400).json({ message: "No ZipCode Entered" })];
                }
                else {
                    return [2 /*return*/, this.bookService
                            .getAllHelper()
                            .then(function (helpers) {
                            var isAvailable;
                            if (helpers) {
                                for (var pc in helpers) {
                                    if (helpers[pc].ZipCode === req.body.postalcode) {
                                        isAvailable = true;
                                    }
                                }
                                if (isAvailable) {
                                    jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, function (err, user) {
                                        if (err) {
                                            return res
                                                .status(401)
                                                .json({ message: "invalid or expired token" });
                                        }
                                        else {
                                            var userEmail = user.userEmail;
                                            var postalCode = req.body.postalcode;
                                            var token_1 = _this.bookService.createToken(userEmail, postalCode);
                                            return res
                                                .status(200)
                                                .cookie("token", token_1, { httpOnly: true });
                                        }
                                    });
                                    return res.status(200).json({ message: "found" });
                                }
                                else {
                                    return res.status(404).json({
                                        message: "We are not providing service in this area. We will notify you if any helper would start working near your area.",
                                    });
                                }
                            }
                            else {
                                return res.status(301).json({ message: "No helper found" });
                            }
                        })
                            .catch(function (error) {
                            console.log(error);
                            return res.status(500).json({
                                error: error,
                            });
                        })];
                }
                return [2 /*return*/];
            });
        }); };
        this.getUserAddresses = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var token, address;
            var _this = this;
            return __generator(this, function (_a) {
                token = req.headers.authorization || req.header('auth');
                address = [];
                if (token) {
                    jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, function (error, user) {
                        if (error) {
                            return res
                                .status(401)
                                .json({ message: "invalid or expired token" });
                        }
                        else {
                            return _this.bookService
                                .getUserByEmail(user.userEmail)
                                .then(function (userByEmail) {
                                if (userByEmail) {
                                    return _this.bookService
                                        .getUserAddress(userByEmail.UserId)
                                        .then(function (users) {
                                        if (users.length > 0) {
                                            for (var us in users) {
                                                if (users[us].PostalCode === user.postalCode) {
                                                    address.push(users[us]);
                                                }
                                            }
                                            if (address.length > 0) {
                                                return res.status(200).json(address);
                                            }
                                            else {
                                                return res
                                                    .status(401)
                                                    .json({ message: "Addresses not found" });
                                            }
                                        }
                                        else {
                                            return res
                                                .status(401)
                                                .json({ message: "User Addresses not found" });
                                        }
                                    })
                                        .catch(function (error) {
                                        console.log(error);
                                        return res.status(500).json({
                                            error: error,
                                        });
                                    });
                                }
                                else {
                                    return res.status(301).json("user not fund");
                                }
                            })
                                .catch(function (error) {
                                console.log(error);
                                return res.status(500).json({
                                    error: error,
                                });
                            });
                        }
                    });
                }
                else {
                    return [2 /*return*/, res.status(401).json({ message: "invalid or expired token" })];
                }
                return [2 /*return*/];
            });
        }); };
        this.createUserAddress = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var token;
            var _this = this;
            return __generator(this, function (_a) {
                token = req.headers.authorization || req.header('auth');
                if (token) {
                    jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, function (error, user) {
                        if (error) {
                            return res
                                .status(401)
                                .json({ message: "invalid or expired token" });
                        }
                        else {
                            req.body.Email = user.userEmail;
                            req.body.PostalCode = user.postalCode;
                            return _this.bookService
                                .getUserByEmail(user.userEmail)
                                .then(function (user) {
                                if (user) {
                                    req.body.UserId = user.UserId;
                                    return _this.bookService
                                        .createUserAddress(req.body)
                                        .then(function (address) {
                                        return res.status(200).json({ message: "Address created successfully" });
                                    })
                                        .catch(function (error) {
                                        console.log(error);
                                        return res.status(500).json({
                                            error: error,
                                        });
                                    });
                                }
                                else {
                                    return res.status(404).json({ message: "user not found" });
                                }
                            })
                                .catch(function (error) {
                                console.log(error);
                                return res.status(500).json({
                                    error: error,
                                });
                            });
                        }
                    });
                }
                return [2 /*return*/];
            });
        }); };
        this.decodeToken = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var token, isFutureDate;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = req.headers.authorization || req.header('auth');
                        return [4 /*yield*/, this.bookService.compareDateWithCurrentDate(req.body.ServiceStartDate)];
                    case 1:
                        isFutureDate = _a.sent();
                        if (isFutureDate) {
                            req.body.ServiceStartDate = new Date(req.body.ServiceStartDate.toString().split('-').reverse().join('-'));
                            if (token) {
                                jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, function (err, user) {
                                    if (err) {
                                        return res.status(401).json({ message: "invalid or expired token" });
                                    }
                                    else {
                                        req.body.ZipCode = user.postalCode;
                                        req.body.Email = user.userEmail;
                                        return _this.bookService
                                            .getUserByEmail(user.userEmail)
                                            .then(function (user) {
                                            if ((user === null || user === void 0 ? void 0 : user.UserTypeId) === 4) {
                                                if (req.body.ServiceHours < 3) {
                                                    return res.status(400).json({ message: 'service hours must be minimum 3 hours' });
                                                }
                                                else {
                                                    next();
                                                }
                                            }
                                            else {
                                                return res.status(401).json({ message: "unauthorised user" });
                                            }
                                        })
                                            .catch(function (error) {
                                            console.log(error);
                                            return res.status(500).json({
                                                error: error,
                                            });
                                        });
                                    }
                                });
                            }
                            else {
                                return [2 /*return*/, res.status(401).json("invalid or expired token")];
                            }
                        }
                        else {
                            return [2 /*return*/, res.status(401).json({ message: 'enter future date for book service' })];
                        }
                        return [2 /*return*/];
                }
            });
        }); };
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
        //                   mg.messages().send(data, (error, user) => {
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
        //                       await mg.messages().send(data, function (error, body) {
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
        this.saveServiceRequestDetail = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.bookService.saveServiceRequestDetail(req.body, req.body.email)
                        .then(function (serviceRequest) {
                        if (serviceRequest) {
                            return res.status(200).json(serviceRequest);
                        }
                        else {
                            return res.status(422).json({ message: 'error in sving service request detail' });
                        }
                    })
                        .catch(function (error) {
                        console.log(error);
                        return res.status(500).json({ error: error });
                    })];
            });
        }); };
        this.saveCleaningServiceDetail = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (req.body.userId && req.body.userTypeId === 4) {
                    if (req.body.ServiceRequestId && req.body.AddressId) {
                        return [2 /*return*/, this.bookService.createServiceRequestAddress(req.body.ServiceRequestId, req.body.AddressId)
                                .then(function (srAddress) {
                                if (srAddress) {
                                    if (req.body.ServiceProviderId) {
                                        return _this.bookService.getHelperById(req.body.ServiceProviderId)
                                            .then(function (helper) {
                                            return _this.bookService.completeServiceRequest(+req.body.ServiceProviderId, req.body.ServiceRequestId)
                                                .then(function (completeSR) {
                                                if (completeSR[0] === 1) {
                                                    var data = _this.bookService.createData(helper === null || helper === void 0 ? void 0 : helper.Email, req.body.ServiceRequestId);
                                                    mg.messages().send(data, function (error, user) {
                                                        if (error) {
                                                            return res.json({ error: error.message });
                                                        }
                                                    });
                                                    return res.status(200).json({ message: "service booked successfully" });
                                                }
                                                else {
                                                    return res.status(422).json({ message: 'error in completing service request' });
                                                }
                                            })
                                                .catch(function (error) {
                                                console.log(error);
                                                return res.status(500).json({ error: error });
                                            });
                                        })
                                            .catch(function (error) {
                                            console.log(error);
                                            return res.status(500).json({
                                                error: error,
                                            });
                                        });
                                    }
                                    else {
                                        return _this.bookService
                                            .getHelpersByZipCode(srAddress.PostalCode)
                                            .then(function (helper) { return __awaiter(_this, void 0, void 0, function () {
                                            var hp_1;
                                            var _this = this;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        if (!(helper.length > 0)) return [3 /*break*/, 2];
                                                        return [4 /*yield*/, this.bookService.removeHelperBlockedLoginCustomer(parseInt(req.body.userId), helper)];
                                                    case 1:
                                                        hp_1 = _a.sent();
                                                        return [2 /*return*/, this.bookService.getBlockedHelper(parseInt(req.body.userId), hp_1)
                                                                .then(function (blockedHelper) { return __awaiter(_this, void 0, void 0, function () {
                                                                var users, _a, _b, _i, e, data;
                                                                return __generator(this, function (_c) {
                                                                    switch (_c.label) {
                                                                        case 0:
                                                                            if (!blockedHelper) return [3 /*break*/, 6];
                                                                            console.log(blockedHelper);
                                                                            return [4 /*yield*/, this.bookService.removeBlockedHelper(hp_1, blockedHelper)];
                                                                        case 1:
                                                                            users = _c.sent();
                                                                            email = this.bookService.getEmailAddressForSendEmail(users, req.body);
                                                                            console.log(email);
                                                                            _a = [];
                                                                            for (_b in email)
                                                                                _a.push(_b);
                                                                            _i = 0;
                                                                            _c.label = 2;
                                                                        case 2:
                                                                            if (!(_i < _a.length)) return [3 /*break*/, 6];
                                                                            e = _a[_i];
                                                                            console.log(email[e]);
                                                                            return [4 /*yield*/, this.bookService.createDataForAll(email[e])];
                                                                        case 3:
                                                                            data = _c.sent();
                                                                            return [4 /*yield*/, mg.messages().send(data, function (error, body) {
                                                                                    if (error) {
                                                                                        return res.json({ error: error.message });
                                                                                    }
                                                                                })];
                                                                        case 4:
                                                                            _c.sent();
                                                                            _c.label = 5;
                                                                        case 5:
                                                                            _i++;
                                                                            return [3 /*break*/, 2];
                                                                        case 6: return [2 /*return*/, res.status(200)
                                                                                .json({ message: "service booked successfully" })];
                                                                    }
                                                                });
                                                            }); })
                                                                .catch(function (error) {
                                                                console.log(error);
                                                                return res.status(500).json({ error: error });
                                                            })];
                                                    case 2: return [2 /*return*/, res.status(404).json({ message: "user not found" })];
                                                }
                                            });
                                        }); })
                                            .catch(function (error) {
                                            console.log(error);
                                            return res.status(500).json({ error: error });
                                        });
                                    }
                                }
                                else {
                                    return res.status(401).json({ message: 'address already available or error in creating address' });
                                }
                            })
                                .catch(function (error) {
                                console.log(error);
                                return res.status(500).json({ error: error });
                            })];
                    }
                    else {
                        return [2 /*return*/, res.status(404).json({ message: 'service request id or address id not found' })];
                    }
                }
                else {
                    return [2 /*return*/, res.status(401).json({ message: 'unauthorised user' })];
                }
                return [2 /*return*/];
            });
        }); };
        this.createFavoriteAndBlocked = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.bookService
                        .createFavoriteAndBlocked(req.body)
                        .then(function (user) {
                        return res.status(200).json(user);
                    })
                        .catch(function (error) {
                        console.log(error);
                        return res.status(500).json({
                            error: error,
                        });
                    })];
            });
        }); };
        this.getFavoriteAndBlocked = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var token;
            var _this = this;
            return __generator(this, function (_a) {
                token = req.headers.authorization || req.header('auth');
                jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, function (error, userToken) {
                    if (error) {
                        return res.status(401).json({ message: "invalid or expired token" });
                    }
                    else {
                        if (req.body.userTypeId === 4 && req.body.userId) {
                            return _this.bookService
                                .getFavoriteAndBlocked(req.body.userId)
                                .then(function (user) { return __awaiter(_this, void 0, void 0, function () {
                                var favoriteSP;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!(user === null)) return [3 /*break*/, 1];
                                            return [2 /*return*/, res.status(404).json({ message: "no helper in favorite list" })];
                                        case 1: return [4 /*yield*/, this.bookService.getTargetUser(user, userToken.postalCode)];
                                        case 2:
                                            favoriteSP = _a.sent();
                                            if (favoriteSP.length > 0) {
                                                return [2 /*return*/, res.status(200).send(favoriteSP)];
                                            }
                                            else {
                                                return [2 /*return*/, res
                                                        .status(404)
                                                        .json({ message: "favorite helper not found" })];
                                            }
                                            _a.label = 3;
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); })
                                .catch(function (error) {
                                console.log(error);
                                return res.status(500).json({ error: error });
                            });
                        }
                        else {
                            return res.status(401).json({ message: 'unauthorised user' });
                        }
                    }
                });
                return [2 /*return*/];
            });
        }); };
        this.bookService = bookService;
    }
    return BookServiceController;
}());
exports.BookServiceController = BookServiceController;
