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
exports.UserManagementService = void 0;
var UserManagementService = /** @class */ (function () {
    function UserManagementService(userManagementRepository) {
        this.userManagementRepository = userManagementRepository;
        this.userManagementRepository = userManagementRepository;
    }
    UserManagementService.prototype.getAllUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var displayUsers, users, _a, _b, _i, us, userType, sortedRequests;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        displayUsers = [];
                        return [4 /*yield*/, this.userManagementRepository.getAllUsers()];
                    case 1:
                        users = _c.sent();
                        if (!(users && users.length > 0)) return [3 /*break*/, 6];
                        _a = [];
                        for (_b in users)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        us = _a[_i];
                        return [4 /*yield*/, this.getUserType(users[us].UserTypeId)];
                    case 3:
                        userType = _c.sent();
                        displayUsers.push({
                            UserId: users[us].UserId,
                            Name: users[us].FirstName + " " + users[us].LastName,
                            DateOfRegistration: users[us].createdAt.toLocaleDateString(),
                            UserType: userType,
                            Phone: users[us].Mobile,
                            PostalCode: users[us].ZipCode,
                            Status: users[us].IsActive
                        });
                        _c.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5:
                        sortedRequests = displayUsers.sort(function (a, b) {
                            return a.UserId - b.UserId;
                        });
                        return [2 /*return*/, sortedRequests];
                    case 6: return [2 /*return*/, null];
                }
            });
        });
    };
    ;
    UserManagementService.prototype.getUserType = function (typeId) {
        return __awaiter(this, void 0, void 0, function () {
            var statusString;
            return __generator(this, function (_a) {
                if (typeId === null) {
                    statusString = null;
                }
                else if (typeId === 1) {
                    statusString = 'Super User';
                }
                else if (typeId === 2) {
                    statusString = 'Admin';
                }
                else if (typeId === 3) {
                    statusString = 'Service Provider';
                }
                else if (typeId === 4) {
                    statusString = 'Customer';
                }
                else {
                    statusString = 'Invalid Status';
                }
                return [2 /*return*/, statusString];
            });
        });
    };
    ;
    UserManagementService.prototype.activeUser = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var user, activatedUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userManagementRepository.getUserDetailById(parseInt(userId))];
                    case 1:
                        user = _a.sent();
                        if (!user) return [3 /*break*/, 5];
                        if (!user.IsActive) return [3 /*break*/, 2];
                        return [2 /*return*/, null];
                    case 2: return [4 /*yield*/, this.userManagementRepository.activeUser(parseInt(userId))];
                    case 3:
                        activatedUser = _a.sent();
                        return [2 /*return*/, activatedUser];
                    case 4: return [3 /*break*/, 6];
                    case 5: return [2 /*return*/, null];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ;
    UserManagementService.prototype.inActiveUser = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var user, inActivatedUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userManagementRepository.getUserDetailById(parseInt(userId))];
                    case 1:
                        user = _a.sent();
                        if (!user) return [3 /*break*/, 5];
                        if (!user.IsActive) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.userManagementRepository.inActiveUser(parseInt(userId))];
                    case 2:
                        inActivatedUser = _a.sent();
                        return [2 /*return*/, inActivatedUser];
                    case 3: return [2 /*return*/, null];
                    case 4: return [3 /*break*/, 6];
                    case 5: return [2 /*return*/, null];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ;
    UserManagementService.prototype.refundAmount = function (srId, refundedAmount, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var serviceRequest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userManagementRepository.getServiceRequestDetailById(srId)];
                    case 1:
                        serviceRequest = _a.sent();
                        if (serviceRequest && serviceRequest.HasIssue === true) {
                            return [2 /*return*/, this.userManagementRepository.refundAmount(srId, refundedAmount, userId)];
                        }
                        else {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return UserManagementService;
}());
exports.UserManagementService = UserManagementService;
