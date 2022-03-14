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
exports.DashboardService = void 0;
var moment_1 = __importDefault(require("moment"));
var DashboardService = /** @class */ (function () {
    function DashboardService(dashboardRepository) {
        this.dashboardRepository = dashboardRepository;
        this.dashboardRepository = dashboardRepository;
    }
    ;
    DashboardService.prototype.getAllServiceRequestByUserId = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.dashboardRepository.getAllServiceRequestByUserId(userId)
                        .then(function (serviceRequests) {
                        var sRequest = [];
                        var currentDate = new Date((0, moment_1.default)(new Date()).format("YYYY-MM-DD"));
                        if (serviceRequests) {
                            for (var sr in serviceRequests) {
                                var serviceRequestDate = new Date(serviceRequests[sr].ServiceStartDate);
                                if (currentDate >= serviceRequestDate) {
                                    console.log('hi');
                                    continue;
                                }
                                sRequest.push(serviceRequests[sr]);
                            }
                        }
                        return sRequest;
                    })];
            });
        });
    };
    ;
    DashboardService.prototype.getServiceRequestDetailById = function (srId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.dashboardRepository.getServiceRequestDetailById(srId)];
            });
        });
    };
    ;
    DashboardService.prototype.getServiceRequestOfHelper = function (helperId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.dashboardRepository.getAllServiceRequestOfHelper(helperId)];
            });
        });
    };
    ;
    DashboardService.prototype.rescheduleServiceRequest = function (date, time, serviceId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.dashboardRepository.rescheduleServiceRequest(date, time, serviceId, parseInt(userId))];
            });
        });
    };
    ;
    DashboardService.prototype.getHelperById = function (helperId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.dashboardRepository.getHelperById(helperId)];
            });
        });
    };
    ;
    DashboardService.prototype.updateServiceRequestStatus = function (serviceId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.dashboardRepository.updateServiceRequestStatus(serviceId, userId)];
            });
        });
    };
    ;
    DashboardService.prototype.compareDateWithCurrentDate = function (date) {
        var formatedDate1 = new Date(date.split("-").reverse().join("-"));
        var formatedDate2 = new Date((0, moment_1.default)(new Date()).format("YYYY-MM-DD"));
        if (formatedDate1 > formatedDate2) {
            return true;
        }
        else {
            return false;
        }
    };
    ;
    DashboardService.prototype.helperHasFutureSameDateAndTime = function (date, serviceRequest, totalHour, time) {
        var srDate;
        var startTime;
        var endTime;
        var uTime = time.split(":");
        if (uTime[1] === '30') {
            uTime[1] = '0.5';
        }
        var updatedTime = parseFloat(uTime[0]) + parseFloat(uTime[1]);
        var enteredDate = new Date(date.split("-").reverse().join("-"));
        var matched;
        for (var count in serviceRequest) {
            if (new Date(serviceRequest[count].ServiceStartDate) > enteredDate) {
                matched = false;
            }
            else if (new Date(serviceRequest[count].ServiceStartDate) < enteredDate) {
                matched = false;
            }
            else {
                var sTime = serviceRequest[count].ServiceStartTime.toString().split(":");
                if (sTime[1] === '30') {
                    sTime[1] = '0.5';
                }
                var availStartTime = parseFloat(sTime[0]) + parseFloat(sTime[1]);
                var availTotalHour = serviceRequest[count].ServiceHours + serviceRequest[count].ExtraHours;
                console.log(updatedTime);
                console.log(totalHour);
                console.log(availStartTime);
                console.log(availTotalHour);
                if (updatedTime + totalHour < availStartTime ||
                    availStartTime + availTotalHour < updatedTime) {
                    matched = false;
                }
                else {
                    srDate = serviceRequest[count].ServiceStartDate.toString().split("-").reverse().join("-");
                    var srTime = availStartTime.toString().split('.');
                    if (srTime[1] === '5') {
                        srTime[1] = '30';
                    }
                    else {
                        srTime[1] = '00';
                    }
                    startTime = srTime.join(':');
                    var eTime = (availStartTime + availTotalHour).toString().split('.');
                    if (parseInt(eTime[1]) === 5) {
                        eTime[1] = '30';
                    }
                    else {
                        eTime[1] = '00';
                    }
                    endTime = eTime.join(':');
                    matched = true;
                    break;
                }
            }
        }
        return { matched: matched, srDate: srDate, startTime: startTime, endTime: endTime };
    };
    ;
    DashboardService.prototype.createData = function (date, time, userEmail, srId) {
        var data = {
            from: 'yashvantdesai7@gmail.com',
            to: userEmail,
            subject: 'About rescheduled service request assigned to you',
            html: "\n            <h1>\u201CService Request ".concat(srId, " has been rescheduled by customer. New date and time are ").concat(date, " ").concat(time, "\u201D.</h1>\n            ")
        };
        return data;
    };
    ;
    DashboardService.prototype.cancelRequestData = function (userEmail, srId) {
        var data = {
            from: 'HelperlandTeam@gmail.com',
            to: userEmail,
            subject: 'About cancelled service request assigned to you',
            html: "\n            <h1>\u201CService Request ".concat(srId, " has been cancelled by customer.</h1>\n            ")
        };
        return data;
    };
    ;
    return DashboardService;
}());
exports.DashboardService = DashboardService;
