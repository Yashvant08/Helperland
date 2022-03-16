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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRequestService = void 0;
var ServiceRequestService = /** @class */ (function () {
    function ServiceRequestService(serviceRequestRepository) {
        this.serviceRequestRepository = serviceRequestRepository;
        this.serviceRequestRepository = serviceRequestRepository;
    }
    ServiceRequestService.prototype.getAllServiceRequests = function () {
        return __awaiter(this, void 0, void 0, function () {
            var displayRequests, ratings, sp, serviceRequests, _a, _b, _i, sr, customer, address, time, status_1, sortedRequests;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        displayRequests = [];
                        return [4 /*yield*/, this.serviceRequestRepository.getAllServiceRequests()];
                    case 1:
                        serviceRequests = _c.sent();
                        if (!(serviceRequests && serviceRequests.length > 0)) return [3 /*break*/, 15];
                        _a = [];
                        for (_b in serviceRequests)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 14];
                        sr = _a[_i];
                        return [4 /*yield*/, this.serviceRequestRepository.getUserDetailById(serviceRequests[sr].UserId)];
                    case 3:
                        customer = _c.sent();
                        return [4 /*yield*/, this.serviceRequestRepository.getServiceRequestAddress(serviceRequests[sr].ServiceRequestId)];
                    case 4:
                        address = _c.sent();
                        if (!serviceRequests[sr].ServiceProviderId) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.serviceRequestRepository.getUserDetailById(serviceRequests[sr].ServiceProviderId)];
                    case 5:
                        sp = _c.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        sp = null;
                        _c.label = 7;
                    case 7:
                        if (!sp) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.serviceRequestRepository.getRatings(customer === null || customer === void 0 ? void 0 : customer.UserId, sp.UserId, serviceRequests[sr].ServiceRequestId)];
                    case 8:
                        ratings = _c.sent();
                        return [3 /*break*/, 10];
                    case 9:
                        ratings = null;
                        _c.label = 10;
                    case 10: return [4 /*yield*/, this.convertTimeToStartEndTime(serviceRequests[sr])];
                    case 11:
                        time = _c.sent();
                        return [4 /*yield*/, this.getStatus(serviceRequests[sr].Status)];
                    case 12:
                        status_1 = _c.sent();
                        displayRequests.push({
                            ServiceId: serviceRequests[sr].ServiceRequestId,
                            ServiceDate: {
                                Date: serviceRequests[sr].ServiceStartDate.toString().split('-').reverse().join('/'),
                                Time: time
                            },
                            CustomerDetails: {
                                Name: (customer === null || customer === void 0 ? void 0 : customer.FirstName) + " " + (customer === null || customer === void 0 ? void 0 : customer.LastName),
                                UserId: customer === null || customer === void 0 ? void 0 : customer.UserId,
                                Address: {
                                    StreetName: address === null || address === void 0 ? void 0 : address.Addressline1,
                                    HouseNumber: address === null || address === void 0 ? void 0 : address.Addressline2,
                                    PostalCode: address === null || address === void 0 ? void 0 : address.PostalCode,
                                    City: address === null || address === void 0 ? void 0 : address.City
                                }
                            },
                            ServiceProvider: {
                                Name: (sp === null || sp === void 0 ? void 0 : sp.FirstName) + " " + (sp === null || sp === void 0 ? void 0 : sp.LastName),
                                ServiceProviderId: sp === null || sp === void 0 ? void 0 : sp.UserId,
                                ProfilePicture: sp === null || sp === void 0 ? void 0 : sp.UserProfilePicture,
                                Ratings: ratings === null || ratings === void 0 ? void 0 : ratings.Ratings
                            },
                            GrossAmount: serviceRequests[sr].TotalCost,
                            NetAmount: serviceRequests[sr].TotalCost,
                            Discount: serviceRequests[sr].Discount,
                            Status: status_1,
                            PaymentStatus: serviceRequests[sr].PaymentDone,
                            HasIssue: serviceRequests[sr].HasIssue
                        });
                        _c.label = 13;
                    case 13:
                        _i++;
                        return [3 /*break*/, 2];
                    case 14:
                        sortedRequests = displayRequests.sort(function (a, b) {
                            return a.ServiceId - b.ServiceId;
                        });
                        return [2 /*return*/, sortedRequests];
                    case 15: return [2 /*return*/, null];
                }
            });
        });
    };
    ServiceRequestService.prototype.getStatus = function (status) {
        return __awaiter(this, void 0, void 0, function () {
            var statusString;
            return __generator(this, function (_a) {
                if (status === null) {
                    statusString = null;
                }
                else if (status === 1) {
                    statusString = 'New';
                }
                else if (status === 2) {
                    statusString = 'Pending';
                }
                else if (status === 3) {
                    statusString = 'Completed';
                }
                else if (status === 4) {
                    statusString = 'Cancelled';
                }
                else if (status === 5) {
                    statusString = 'Refunded';
                }
                else {
                    statusString = 'Invalid Status';
                }
                return [2 /*return*/, statusString];
            });
        });
    };
    ServiceRequestService.prototype.convertTimeToStartEndTime = function (serviceRequest) {
        return __awaiter(this, void 0, void 0, function () {
            var startTimeArray, startTime, endTimeInt, endTimeArray, time;
            return __generator(this, function (_a) {
                startTimeArray = serviceRequest.ServiceStartTime.toString().split(':');
                startTime = startTimeArray[0] + ":" + startTimeArray[1];
                if (startTimeArray[1] === "30") {
                    startTimeArray[1] = "0.5";
                }
                else {
                    startTimeArray[1] = "0";
                }
                endTimeInt = parseFloat(startTimeArray[0]) + parseFloat(startTimeArray[1]) + serviceRequest.ServiceHours + serviceRequest.ExtraHours;
                endTimeArray = endTimeInt.toString().split('.');
                if (endTimeArray[1] === '5') {
                    endTimeArray[1] = '30';
                }
                else {
                    endTimeArray[1] = '00';
                }
                time = startTime + " - " + endTimeArray[0] + ":" + endTimeArray[1];
                return [2 /*return*/, time];
            });
        });
    };
    ServiceRequestService.prototype.filterData = function (requests, filters) {
        return __awaiter(this, void 0, void 0, function () {
            var filterData, fromDate_1, toDate_1, user_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (filters.ServiceRequestId) {
                            filterData = requests.filter(function (element) {
                                return element.ServiceId === filters.ServiceRequestId;
                            });
                        }
                        if (filters.Status) {
                            if (filterData) {
                                filterData = filterData.filter(function (element) {
                                    return element.Status === filters.Status;
                                });
                            }
                            else {
                                filterData = requests.filter(function (element) {
                                    return element.Status === filters.Status;
                                });
                            }
                        }
                        if (filters.PostalCode) {
                            if (filterData) {
                                console.log(filters.PostalCode);
                                filterData = filterData.filter(function (element) {
                                    return element.CustomerDetails.Address.PostalCode === filters.PostalCode;
                                });
                            }
                            else {
                                filterData = requests.filter(function (element) {
                                    return element.CustomerDetails.Address.PostalCode === filters.PostalCode;
                                });
                            }
                        }
                        if (filters.UserId) {
                            if (filterData) {
                                filterData = filterData.filter(function (element) {
                                    return element.CustomerDetails.UserId === filters.UserId;
                                });
                            }
                            else {
                                filterData = requests.filter(function (element) {
                                    return element.CustomerDetails.UserId === filters.UserId;
                                });
                            }
                        }
                        if (filters.ServiceProviderId) {
                            if (filterData) {
                                filterData = filterData.filter(function (element) {
                                    return element.ServiceProvider.ServiceProviderId === filters.ServiceProviderId;
                                });
                            }
                            else {
                                filterData = requests.filter(function (element) {
                                    return element.ServiceProvider.ServiceProviderId === filters.ServiceProviderId;
                                });
                            }
                        }
                        if (filters.HasIssue !== null) {
                            if (filterData) {
                                filterData = filterData.filter(function (element) {
                                    return element.HasIssue === filters.HasIssue;
                                });
                            }
                            else {
                                filterData = requests.filter(function (element) {
                                    return element.HasIssue === filters.HasIssue;
                                });
                            }
                        }
                        if (filters.FromDate) {
                            fromDate_1 = new Date(filters.FromDate.split('-').reverse().join('-'));
                            if (filterData) {
                                console.log(fromDate_1);
                                filterData = filterData.filter(function (element) {
                                    return new Date(element.ServiceDate.Date.split('/').reverse().join('-')) >= fromDate_1;
                                });
                            }
                            else {
                                filterData = requests.filter(function (element) {
                                    return new Date(element.ServiceDate.Date.split('/').reverse().join('-')) >= fromDate_1;
                                });
                            }
                        }
                        if (filters.ToDate) {
                            toDate_1 = new Date(filters.ToDate.split('-').reverse().join('-'));
                            if (filterData) {
                                filterData = filterData.filter(function (element) {
                                    return new Date(element.ServiceDate.Date.split('/').reverse().join('-')) <= toDate_1;
                                });
                            }
                            else {
                                filterData = requests.filter(function (element) {
                                    return new Date(element.ServiceDate.Date.split('/').reverse().join('-')) <= toDate_1;
                                });
                            }
                        }
                        if (!filters.Email) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.serviceRequestRepository.getUserByEmail(filters.Email)];
                    case 1:
                        user_1 = _a.sent();
                        if (user_1) {
                            if (filterData) {
                                console.log("yes");
                                filterData = filterData.filter(function (element) {
                                    return element.CustomerDetails.UserId === user_1.UserId ||
                                        element.ServiceProvider.ServiceProviderId === user_1.UserId;
                                });
                            }
                            else {
                                filterData = requests.filter(function (element) {
                                    return element.CustomerDetails.UserId === user_1.UserId ||
                                        element.ServiceProvider.ServiceProviderId === user_1.UserId;
                                });
                            }
                        }
                        else {
                            filterData = [];
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/, filterData];
                }
            });
        });
    };
    ServiceRequestService.prototype.getServiceRequestById = function (requestId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.serviceRequestRepository.getServiceRequestById(parseInt(requestId))];
            });
        });
    };
    ServiceRequestService.prototype.updateServiceRequest = function (requestId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.serviceRequestRepository.updateServiceRequest(parseInt(requestId), parseInt(userId))];
            });
        });
    };
    ServiceRequestService.prototype.getEmailAddressOfCustAndSP = function (serviceRequest) {
        return __awaiter(this, void 0, void 0, function () {
            var email, user, serviceProvider;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = [];
                        return [4 /*yield*/, this.serviceRequestRepository.getUserDetailById(serviceRequest.UserId)];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, this.serviceRequestRepository.getUserDetailById(serviceRequest.ServiceProviderId)];
                    case 2:
                        serviceProvider = _a.sent();
                        if (serviceRequest.UserId && user) {
                            email.push(user.Email);
                        }
                        if (serviceRequest.ServiceProviderId && serviceProvider) {
                            email.push(serviceProvider.Email);
                        }
                        return [2 /*return*/, email];
                }
            });
        });
    };
    ServiceRequestService.prototype.createData = function (userEmail, srId) {
        var data = {
            from: 'yashvantdesai7@gmail.com',
            to: userEmail,
            subject: 'About cancelled service request',
            html: "\n              <h3>Due to some reason service request ".concat(srId, " has been cancelled by admin.</h3>\n              ")
        };
        return data;
    };
    return ServiceRequestService;
}());
exports.ServiceRequestService = ServiceRequestService;
