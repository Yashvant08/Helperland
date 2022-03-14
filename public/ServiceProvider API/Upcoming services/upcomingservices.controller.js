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
exports.UpcomingServiceController = void 0;
var mailgun_js_1 = __importDefault(require("mailgun-js"));
require("dotenv").config();
var DOMAIN = process.env.MAILGUN_DOMAIN;
var mg = (0, mailgun_js_1.default)({
    apiKey: process.env.MAILGUN_API,
    domain: DOMAIN,
});
var UpcomingServiceController = /** @class */ (function () {
    function UpcomingServiceController(upcomingService) {
        var _this = this;
        this.upcomingService = upcomingService;
        this.getUpcomingServices = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (req.body.userId && req.body.userTypeId === 3) {
                    return [2 /*return*/, this.upcomingService
                            .getAllUpcomingServicerequests(req.body.userId)
                            .then(function (serviceRequests) {
                            if (serviceRequests) {
                                if (serviceRequests.length > 0) {
                                    return res.status(200).json(serviceRequests);
                                }
                                else {
                                    return res
                                        .status(404)
                                        .json({ message: "no upcoming service requests found" });
                                }
                            }
                            else {
                                return res
                                    .status(404)
                                    .json({ message: "no upcoming service requests found" });
                            }
                        })
                            .catch(function (error) {
                            console.log(error);
                            return res.status(500).json({ error: error });
                        })];
                }
                else {
                    return [2 /*return*/, res.status(401).json({ message: "unauthorised user" })];
                }
                return [2 /*return*/];
            });
        }); };
        this.cancelServiceRequest = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (req.body.userId && req.body.userTypeId === 3) {
                    if (req.params.requestId) {
                        return [2 /*return*/, this.upcomingService
                                .getServiceRequestDetailById(req.params.requestId)
                                .then(function (serviceRequest) {
                                if (serviceRequest) {
                                    if (serviceRequest.ServiceProviderId === req.body.userId) {
                                        return _this.upcomingService
                                            .cancelServiceRequest(req.params.requestId, req.body.userId)
                                            .then(function (updatedrequest) {
                                            if (updatedrequest[0] === 1) {
                                                return res.status(200).json({
                                                    message: "service request cancelled successfully",
                                                });
                                            }
                                            else {
                                                return res.status(422).json({
                                                    message: "error in cancelling service request",
                                                });
                                            }
                                        })
                                            .catch(function (error) {
                                            console.log(error);
                                            return res.status(500).json({ error: error });
                                        });
                                    }
                                    else {
                                        return res.status(401).json({ message: "unauthorised user" });
                                    }
                                }
                                else {
                                    return res
                                        .status(404)
                                        .json({ message: "service request detail not found" });
                                }
                            })];
                    }
                    else {
                        return [2 /*return*/, res
                                .status(400)
                                .json({ message: "service request id not found" })];
                    }
                }
                else {
                    return [2 /*return*/, res.status(401).json({ message: "unauthorised user" })];
                }
                return [2 /*return*/];
            });
        }); };
        this.completeServiceRequest = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (req.body.userId && req.body.userTypeId === 3) {
                    if (req.params.requestId) {
                        return [2 /*return*/, this.upcomingService
                                .getServiceRequestDetailForCompleteRequest(req.params.requestId)
                                .then(function (serviceRequest) {
                                if (serviceRequest) {
                                    if (serviceRequest.ServiceProviderId === req.body.userId) {
                                        return _this.upcomingService
                                            .isRequestTimeLessThanCurrentDateAndTime(serviceRequest)
                                            .then(function (serviceRequest) {
                                            if (serviceRequest) {
                                                return _this.upcomingService
                                                    .completeServiceRequest(req.params.requestId, req.body.userId)
                                                    .then(function (updatedrequest) {
                                                    if (updatedrequest[0] === 1) {
                                                        return res
                                                            .status(200)
                                                            .json({
                                                            message: "service request completed successfully",
                                                        });
                                                    }
                                                    else {
                                                        return res
                                                            .status(422)
                                                            .json({
                                                            message: "error in updating service request",
                                                        });
                                                    }
                                                })
                                                    .catch(function (error) {
                                                    console.log(error);
                                                    return res.status(500).json({ error: error });
                                                });
                                            }
                                            else {
                                                return res
                                                    .status(400)
                                                    .json({
                                                    message: "You can not complete service request before end time",
                                                });
                                            }
                                        })
                                            .catch(function (error) {
                                            console.log(error);
                                            return res.status(500).json({ error: error });
                                        });
                                    }
                                    else {
                                        return res.status(401).json({ message: "unauthorised user" });
                                    }
                                }
                                else {
                                    return res
                                        .status(404)
                                        .json({ message: "service request detail not found" });
                                }
                            })];
                    }
                    else {
                        return [2 /*return*/, res
                                .status(400)
                                .json({ message: "service request id not found" })];
                    }
                }
                else {
                    return [2 /*return*/, res.status(401).json({ message: "unauthorised user" })];
                }
                return [2 /*return*/];
            });
        }); };
        this.getServiceRequestDetailById = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var Id;
            return __generator(this, function (_a) {
                console.log(req.body);
                Id = parseInt(req.params.id);
                if (req.body.userTypeId === 3) {
                    return [2 /*return*/, this.upcomingService
                            .getServiceDetailById(Id)
                            .then(function (serviceRequestDetail) {
                            console.log(serviceRequestDetail);
                            if ((serviceRequestDetail === null || serviceRequestDetail === void 0 ? void 0 : serviceRequestDetail.ServiceProviderId) === req.body.userId) {
                                return res.status(200).json(serviceRequestDetail);
                            }
                            else {
                                return res.status(404).json({
                                    message: "No service request detail found for this request",
                                });
                            }
                        })
                            .catch(function (error) {
                            console.log(error);
                            return res.status(500).json({
                                error: error,
                            });
                        })];
                }
                else {
                    return [2 /*return*/, res.status(401).json({ message: "Unauthorised User" })];
                }
                return [2 /*return*/];
            });
        }); };
        this.upcomingService = upcomingService;
    }
    return UpcomingServiceController;
}());
exports.UpcomingServiceController = UpcomingServiceController;
