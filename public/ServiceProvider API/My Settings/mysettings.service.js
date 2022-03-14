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
exports.MySettingsService = void 0;
var MySettingsService = /** @class */ (function () {
    function MySettingsService(mySettingsRepository) {
        this.mySettingsRepository = mySettingsRepository;
        this.mySettingsRepository = mySettingsRepository;
    }
    ;
    MySettingsService.prototype.getUserDetailById = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var displayDetail, detail, address;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        displayDetail = {};
                        return [4 /*yield*/, this.mySettingsRepository.getUserDetailById(userId)];
                    case 1:
                        detail = _a.sent();
                        return [4 /*yield*/, this.mySettingsRepository.getUserAddressById(userId)];
                    case 2:
                        address = _a.sent();
                        if (detail) {
                            displayDetail = {
                                Status: detail.Status,
                                BasicDetails: {
                                    FirstName: detail.FirstName,
                                    LastName: detail.LastName,
                                    EmailAddress: detail.Email,
                                    PhoneNumber: detail.Mobile,
                                    DateOfBirth: detail.DateOfBirth,
                                    Nationality: detail.NationalityId,
                                    Gender: detail.Gender,
                                    ProfilePicture: detail.UserProfilePicture,
                                },
                                Address: {
                                    StreetName: address === null || address === void 0 ? void 0 : address.Addressline1,
                                    HouseNumber: address === null || address === void 0 ? void 0 : address.Addressline2,
                                    PostalCode: address === null || address === void 0 ? void 0 : address.PostalCode,
                                    City: address === null || address === void 0 ? void 0 : address.City
                                }
                            };
                        }
                        return [2 /*return*/, displayDetail];
                }
            });
        });
    };
    MySettingsService.prototype.updateUserDetailbyId = function (userId, user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (user.Gender === "Male") {
                    user.GenderId = 1;
                }
                else if (user.Gender === "Female") {
                    user.GenderId = 2;
                }
                else {
                    user.GenderId = 3;
                }
                return [2 /*return*/, this.mySettingsRepository.updateUserDetailById(parseInt(userId), user)];
            });
        });
    };
    MySettingsService.prototype.getHelperAddressById = function (helperId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.mySettingsRepository.getHelperAddressById(helperId)];
            });
        });
    };
    MySettingsService.prototype.updateUserAddress = function (addressId, user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.mySettingsRepository.updateUserAddress(addressId, user)];
            });
        });
    };
    MySettingsService.prototype.createAddress = function (addressId, user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.mySettingsRepository.createAddress(addressId, user)];
            });
        });
    };
    MySettingsService.prototype.getUserById = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.mySettingsRepository.getUserById(parseInt(userId))];
            });
        });
    };
    MySettingsService.prototype.changePassword = function (userId, password) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.mySettingsRepository.changePassword(parseInt(userId), password)];
            });
        });
    };
    // //local services
    MySettingsService.prototype.convertStringToDate = function (dateStr) {
        var dateString = dateStr.toString().split('-').reverse().join('-');
        var date = new Date(dateString);
        return date;
    };
    return MySettingsService;
}());
exports.MySettingsService = MySettingsService;
