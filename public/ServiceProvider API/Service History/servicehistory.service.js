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
exports.ServiceHistoryService = void 0;
var moment_1 = __importDefault(require("moment"));
var ServiceHistoryService = /** @class */ (function () {
    function ServiceHistoryService(serviceHistoryRepository) {
        this.serviceHistoryRepository = serviceHistoryRepository;
        this.serviceHistoryRepository = serviceHistoryRepository;
    }
    ServiceHistoryService.prototype.getServiceRequestHistoryOfHelper = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.serviceHistoryRepository.getServiceRequestHistoryOfHelper(userId)];
            });
        });
    };
    ServiceHistoryService.prototype.getServiceRequestDetailById = function (srId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.serviceHistoryRepository.getServiceRequestDetailById(srId)];
            });
        });
    };
    ServiceHistoryService.prototype.getUserDetailById = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.serviceHistoryRepository.getUserDetailById(userId)];
            });
        });
    };
    ServiceHistoryService.prototype.getRatingsOfHelper = function (helperId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.serviceHistoryRepository.getRatingsOfHelper(parseInt(helperId))];
            });
        });
    };
    //local service
    ServiceHistoryService.prototype.compareDateWithCurrentDate = function (requestHistory) {
        var srHistory = [];
        var formatedDate2 = new Date((0, moment_1.default)(new Date()).format("YYYY-MM-DD"));
        for (var sr in requestHistory) {
            var date = requestHistory[sr].ServiceStartDate;
            var formatedDate1 = new Date((0, moment_1.default)(date).format("YYYY-MM-DD"));
            if (formatedDate1 <= formatedDate2) {
                srHistory.push(requestHistory[sr]);
            }
        }
        return srHistory;
    };
    ServiceHistoryService.prototype.getDatForExport = function (serviceRequest) {
        return __awaiter(this, void 0, void 0, function () {
            var exportHistory, _a, _b, _i, history_1, user;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        exportHistory = [];
                        _a = [];
                        for (_b in serviceRequest)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        history_1 = _a[_i];
                        return [4 /*yield*/, this.serviceHistoryRepository.getUserDetailById(serviceRequest[history_1].UserId)];
                    case 2:
                        user = _c.sent();
                        exportHistory.push({
                            ServiceId: serviceRequest[history_1].ServiceRequestId,
                            StartDate: serviceRequest[history_1].ServiceStartDate,
                            Customer: (user === null || user === void 0 ? void 0 : user.FirstName) + " " + (user === null || user === void 0 ? void 0 : user.LastName),
                            Payment: serviceRequest[history_1].TotalCost,
                        });
                        _c.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, exportHistory];
                }
            });
        });
    };
    ServiceHistoryService.prototype.gethistoryForDisplay = function (serviceRequest) {
        return __awaiter(this, void 0, void 0, function () {
            var historyData, _a, _b, _i, sr, user, address, startTimeArray, endTimeInt;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        historyData = [];
                        _a = [];
                        for (_b in serviceRequest)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        sr = _a[_i];
                        return [4 /*yield*/, this.serviceHistoryRepository.getUserDetailById(serviceRequest[sr].UserId)];
                    case 2:
                        user = _c.sent();
                        return [4 /*yield*/, this.serviceHistoryRepository.getServiceAddress(serviceRequest[sr].ServiceRequestId)];
                    case 3:
                        address = _c.sent();
                        startTimeArray = serviceRequest[sr].ServiceStartTime.toString().split(":");
                        endTimeInt = (parseFloat(startTimeArray[0]) +
                            parseFloat(startTimeArray[1]) / 60 +
                            serviceRequest[sr].ServiceHours +
                            serviceRequest[sr].ExtraHours)
                            .toString()
                            .split(".");
                        if (endTimeInt[1]) {
                            endTimeInt[1] = (parseInt(endTimeInt[1]) * 6).toString();
                        }
                        else {
                            endTimeInt[1] = "00";
                        }
                        if (user) {
                            if (address) {
                                historyData.push({
                                    ServiceId: serviceRequest[sr].ServiceRequestId,
                                    StartDate: serviceRequest[sr].ServiceStartDate.toString().split("-").reverse()
                                        .join("-"),
                                    Customer: user.FirstName + " " + user.LastName,
                                    Address: {
                                        Street: address.Addressline1,
                                        HouseNumber: address.Addressline2,
                                        City: address.City,
                                        PostalCode: address.PostalCode,
                                    },
                                    Time: startTimeArray[0] + ":" + startTimeArray[1] + "-" + endTimeInt[0] + ":" + endTimeInt[1]
                                });
                            }
                        }
                        _c.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/, historyData];
                }
            });
        });
    };
    ServiceHistoryService.prototype.getRatingsForDisplay = function (ratings) {
        return __awaiter(this, void 0, void 0, function () {
            var displayData, _loop_1, this_1, _a, _b, _i, rate;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        displayData = [];
                        _loop_1 = function (rate) {
                            var serviceRequest, startTimeArray, endTimeInt, user;
                            return __generator(this, function (_d) {
                                switch (_d.label) {
                                    case 0: return [4 /*yield*/, this_1.serviceHistoryRepository.getServiceRequestDetailById(ratings[rate].ServiceRequestId)];
                                    case 1:
                                        serviceRequest = _d.sent();
                                        startTimeArray = serviceRequest === null || serviceRequest === void 0 ? void 0 : serviceRequest.ServiceStartTime.toString().split(":");
                                        endTimeInt = (parseFloat(startTimeArray[0]) +
                                            parseFloat(startTimeArray[1]) / 60 +
                                            (serviceRequest === null || serviceRequest === void 0 ? void 0 : serviceRequest.ServiceHours) +
                                            (serviceRequest === null || serviceRequest === void 0 ? void 0 : serviceRequest.ExtraHours)).toString().split(".");
                                        if (endTimeInt[1]) {
                                            endTimeInt[1] = (parseInt(endTimeInt[1]) * 6).toString();
                                        }
                                        else {
                                            endTimeInt[1] = "00";
                                        }
                                        return [4 /*yield*/, this_1.serviceHistoryRepository
                                                .getUserDetailById(ratings[rate].RatingFrom)
                                                .then(function (user) {
                                                if (serviceRequest) {
                                                    if (user) {
                                                        displayData.push({
                                                            ServiceId: ratings[rate].ServiceRequestId,
                                                            StartDate: serviceRequest.ServiceStartDate.toString().split("-").reverse().join("-"),
                                                            Customer: user.FirstName + " " + user.LastName,
                                                            CustomerComment: ratings[rate].Comments,
                                                            Ratings: ratings[rate].Ratings,
                                                            Time: startTimeArray[0] + ":" + startTimeArray[1] + "-" + endTimeInt[0] + ":" + endTimeInt[1]
                                                        });
                                                    }
                                                }
                                            })];
                                    case 2:
                                        user = _d.sent();
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _a = [];
                        for (_b in ratings)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        rate = _a[_i];
                        return [5 /*yield**/, _loop_1(rate)];
                    case 2:
                        _c.sent();
                        _c.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, displayData];
                }
            });
        });
    };
    return ServiceHistoryService;
}());
exports.ServiceHistoryService = ServiceHistoryService;
