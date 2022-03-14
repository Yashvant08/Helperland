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
exports.ServiceRequestController = void 0;
var mailgun_js_1 = __importDefault(require("mailgun-js"));
require("dotenv").config();
var DOMAIN = process.env.MAILGUN_DOMAIN;
var mg = (0, mailgun_js_1.default)({
    apiKey: process.env.MAILGUN_API,
    domain: DOMAIN,
});
var ServiceRequestController = /** @class */ (function () {
    function ServiceRequestController(serviceRequestService) {
        var _this = this;
        this.serviceRequestService = serviceRequestService;
        this.getAllNewServiceRequests = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (req.body.userTypeId === 3) {
                    if (req.body.userId) {
                        return [2 /*return*/, this.serviceRequestService
                                .getHelperDetailbyId(req.body.userId)
                                .then(function (helper) {
                                if (helper) {
                                    if (helper.ZipCode === null) {
                                        return res.status(404).json({
                                            message: "you have not provided zipcode in your detail please update your detail to get requests available in your entered zipcode area",
                                        });
                                    }
                                    else {
                                        return _this.serviceRequestService
                                            .getAllPendingServiceRequestByZipcode(helper.ZipCode, req.body.userId)
                                            .then(function (serviceRequests) { return __awaiter(_this, void 0, void 0, function () {
                                            var sRequests, requestDetail;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        if (!(serviceRequests && serviceRequests.length > 0)) return [3 /*break*/, 5];
                                                        return [4 /*yield*/, this.serviceRequestService.filterServiceRequestsCompatibleWithHelper(req.body.PetsAtHome, serviceRequests)];
                                                    case 1:
                                                        sRequests = _a.sent();
                                                        if (!(sRequests && sRequests.length > 0)) return [3 /*break*/, 3];
                                                        return [4 /*yield*/, this.serviceRequestService.displayRequestDetail(sRequests)];
                                                    case 2:
                                                        requestDetail = _a.sent();
                                                        return [2 /*return*/, res.status(200).json(requestDetail)];
                                                    case 3: return [2 /*return*/, res
                                                            .status(404)
                                                            .json({ message: "service requests not found" })];
                                                    case 4: return [3 /*break*/, 6];
                                                    case 5: return [2 /*return*/, res
                                                            .status(404)
                                                            .json({ message: "service requests not found" })];
                                                    case 6: return [2 /*return*/];
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
                                    return res.status(404).json({ message: "helper not found" });
                                }
                            })
                                .catch(function (error) {
                                console.log(error);
                                return res.status(500).json({ error: error });
                            })];
                    }
                    else {
                        return [2 /*return*/, res
                                .status(422)
                                .json({ message: "helperId not found in request body" })];
                    }
                }
                else {
                    return [2 /*return*/, res.status(401).json({ message: "unauthorised user" })];
                }
                return [2 /*return*/];
            });
        }); };
        this.getServiceRequestDetailById = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log(req.body);
                if (req.body.userTypeId === 3) {
                    return [2 /*return*/, this.serviceRequestService
                            .getServiceRequestDetailById(req.params.requestId)
                            .then(function (serviceRequestDetail) {
                            if (serviceRequestDetail) {
                                return res.status(200).json(serviceRequestDetail);
                            }
                            else {
                                return res
                                    .status(404)
                                    .json({ message: "request detail not available" });
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
        this.acceptableNewServiceRequestOrNot = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (req.params.requestId) {
                    return [2 /*return*/, this.serviceRequestService
                            .getServiceRequestDetailById(req.params.requestId)
                            .then(function (serviceRequest) {
                            if (serviceRequest) {
                                req.body.ZipCode = serviceRequest.ZipCode;
                                return _this.serviceRequestService
                                    .getAllServiceRequestsOfHelper(req.body.userId)
                                    .then(function (serviceRequests) { return __awaiter(_this, void 0, void 0, function () {
                                    var _a, srId, matched;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0:
                                                req.body.totalHour =
                                                    serviceRequest.ExtraHours + serviceRequest.ServiceHours;
                                                if (!serviceRequests) return [3 /*break*/, 2];
                                                return [4 /*yield*/, this.serviceRequestService.helperHasFutureSameDateAndTime(serviceRequest.ServiceStartDate, serviceRequests, req.body.totalHour, serviceRequest.ServiceStartTime)];
                                            case 1:
                                                _a = _b.sent(), srId = _a.srId, matched = _a.matched;
                                                if (matched) {
                                                    return [2 /*return*/, res.status(422).json({
                                                            message: "Another service request " +
                                                                srId +
                                                                " has already been assigned which has time overlap with this service request. You can’t pick this one!",
                                                        })];
                                                }
                                                else {
                                                    next();
                                                }
                                                return [3 /*break*/, 3];
                                            case 2:
                                                next();
                                                _b.label = 3;
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
                                return res.status(422).json({
                                    message: "This service request is no more available. It has been assigned to another provider",
                                });
                            }
                        })
                            .catch(function (error) {
                            console.log(error);
                            return res.status(500).json({ error: error });
                        })];
                }
                else {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: "proper input not found in request" })];
                }
                return [2 /*return*/];
            });
        }); };
        this.acceptNewServiceRequest = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.serviceRequestService
                        .acceptNewServiceRequest(req.params.requestId, req.body.userId)
                        .then(function (updatedServiceRequest) {
                        if (updatedServiceRequest[0] === 1) {
                            return _this.serviceRequestService
                                .getHelpersByZipCode(req.body.ZipCode)
                                .then(function (helpers) {
                                if (helpers) {
                                    for (var hp in helpers) {
                                        if (helpers[hp].Email === req.body.email) {
                                            continue;
                                        }
                                        var data = _this.serviceRequestService.createData(helpers[hp].Email, req.params.requestId);
                                        console.log(data);
                                        mg.messages().send(data, function (error, body) {
                                            if (error) {
                                                return res.json({ error: error.message });
                                            }
                                        });
                                    }
                                }
                                return res
                                    .status(200)
                                    .json({ message: "service request accepted successfully" });
                            })
                                .catch(function (error) {
                                console.log(error);
                                return res.status(500).json({ error: error });
                            });
                        }
                        else {
                            return res
                                .status(404)
                                .json({ message: "error in accepting service request" });
                        }
                    })
                        .catch(function (error) {
                        console.log(error);
                        return res.status(500).json({ error: error });
                    })];
            });
        }); };
        this.serviceRequestService = serviceRequestService;
    }
    return ServiceRequestController;
}());
exports.ServiceRequestController = ServiceRequestController;
