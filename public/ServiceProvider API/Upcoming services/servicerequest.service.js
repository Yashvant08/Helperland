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
    ServiceRequestService.prototype.getHelperDetailbyId = function (helperId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.serviceRequestRepository.getHelperDetailById(parseInt(helperId))];
            });
        });
    };
    ServiceRequestService.prototype.getServiceRequestDetailById = function (requestId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.serviceRequestRepository.getServiceRequestDetailById(parseInt(requestId))];
            });
        });
    };
    ServiceRequestService.prototype.getAllServiceRequestsOfHelper = function (helperId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.serviceRequestRepository.getAllServiceRequestsOfHelper(parseInt(helperId))];
            });
        });
    };
    ServiceRequestService.prototype.getAllPendingServiceRequestByZipcode = function (zipCode) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.serviceRequestRepository.getAllPendingServiceRequestByZipcode(zipCode)];
            });
        });
    };
    ServiceRequestService.prototype.getHelpersByZipCode = function (zipCode) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.serviceRequestRepository.getHelpersByZipCode(zipCode)];
            });
        });
    };
    ServiceRequestService.prototype.acceptNewServiceRequest = function (serviceId, helperId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.serviceRequestRepository.acceptNewServiceRequest(parseInt(serviceId), parseInt(helperId))];
            });
        });
    };
    ;
    //Local Services
    ServiceRequestService.prototype.filterServiceRequestsCompatibleWithHelper = function (includePets, serviceRequests) {
        var sRequests = [];
        if (includePets === false) {
            for (var sr in serviceRequests) {
                if (serviceRequests[sr].HasPets === false) {
                    sRequests.push(serviceRequests[sr]);
                }
            }
        }
        else {
            return serviceRequests;
        }
        return sRequests;
    };
    ServiceRequestService.prototype.helperHasFutureSameDateAndTime = function (date, serviceRequest, acceptTotalHour, time) {
        var srId;
        var matched = false;
        for (var sr in serviceRequest) {
            if (serviceRequest[sr].ServiceStartDate === date) {
                var acceptTime = time.toString().split(":");
                if (acceptTime[1] === "30") {
                    acceptTime[1] = "0.5";
                }
                var acceptStartTime = parseFloat(acceptTime[0]) + parseFloat(acceptTime[1]);
                var availableTime = serviceRequest[sr].ServiceStartTime.toString().split(":");
                if (availableTime[1] === "30") {
                    availableTime[1] = "0.5";
                }
                var availableStartTime = parseFloat(availableTime[0]) + parseFloat(availableTime[1]);
                var availableTotalHour = serviceRequest[sr].ServiceHours + serviceRequest[sr].ExtraHours;
                // console.log(acceptStartTime);
                // console.log(acceptTotalHour);
                // console.log(availableStartTime);
                // console.log(availableTotalHour);
                var totalAcceptTime = acceptStartTime + acceptTotalHour + 1;
                var totalAvailableTime = availableStartTime + availableTotalHour + 1;
                if (availableStartTime >= totalAcceptTime ||
                    acceptStartTime >= totalAvailableTime) {
                    matched = false;
                }
                else {
                    srId = serviceRequest[sr].ServiceRequestId;
                    matched = true;
                    break;
                }
            }
            else {
                matched = false;
            }
        }
        return { matched: matched, srId: srId };
    };
    ServiceRequestService.prototype.createData = function (userEmail, srId) {
        var data = {
            from: 'yashvantdesai7@gmail.com',
            to: userEmail,
            subject: 'About assigned service request',
            html: "\n            <h3>A service request ".concat(srId, " has already been accepted by someone and is no more available to you.</h3>\n            ")
        };
        return data;
    };
    return ServiceRequestService;
}());
exports.ServiceRequestService = ServiceRequestService;
