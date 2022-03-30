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
exports.UserManagementController = void 0;
require("dotenv").config();
var UserManagementController = /** @class */ (function () {
    function UserManagementController(userManagementService) {
        var _this = this;
        this.userManagementService = userManagementService;
        this.getAllUsers = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (req.body.userTypeId === 2 && req.body.userId) {
                    return [2 /*return*/, this.userManagementService
                            .getAllUsers()
                            .then(function (users) {
                            if (users && users.length > 0) {
                                return res.status(200).json(users);
                            }
                            else {
                                return res.status(404).json({ message: "users not found" });
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
        this.activeInactiveUser = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (req.body.userTypeId === 2) {
                    if (req.body.Active) {
                        return [2 /*return*/, this.userManagementService.activeUser(req.params.userId)
                                .then(function (activeUser) {
                                if (activeUser !== null) {
                                    if (activeUser[0] === 1) {
                                        return res.status(200).json({ message: "user activated successfully" });
                                    }
                                    else {
                                        return res.status(422).json({ message: "error in  activating user" });
                                    }
                                }
                                else {
                                    return res.status(404).json({ message: "user account already active or user not found" });
                                }
                            })
                                .catch(function (error) {
                                console.log(error);
                                return res.status(500).json({ error: error });
                            })];
                    }
                    else {
                        return [2 /*return*/, this.userManagementService.inActiveUser(req.params.userId)
                                .then(function (inActiveUser) {
                                if (inActiveUser !== null) {
                                    if (inActiveUser[0] === 1) {
                                        return res.status(200).json({ message: "user inActive successfully" });
                                    }
                                    else {
                                        return res.status(422).json({ message: "error in  inActivating user" });
                                    }
                                }
                                else {
                                    return res.status(404).json({ message: "user account already inActive or user not found" });
                                }
                            })
                                .catch(function (error) {
                                console.log(error);
                                return res.status(500).json({ error: error });
                            })];
                    }
                }
                else {
                    return [2 /*return*/, res.status(401).json({ message: "Unauthorised User" })];
                }
                return [2 /*return*/];
            });
        }); };
        this.refundAmount = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var refundamount;
            return __generator(this, function (_a) {
                if (req.body.userTypeId === 2) {
                    if (req.body.Percentage) {
                        refundamount = (req.body.RefundedAmount * req.body.Percentage) / 100;
                    }
                    else {
                        refundamount = req.body.RefundedAmount;
                    }
                    if (refundamount === null) {
                        return [2 /*return*/, res.status(401).json({ message: "refund amount can not be null" })];
                    }
                    else {
                        if (req.body.PaidAmount > refundamount) {
                            return [2 /*return*/, this.userManagementService.refundAmount(req.body.ServiceRequestId, refundamount, req.body.userId)
                                    .then(function (serviceRequest) {
                                    if (serviceRequest) {
                                        if (serviceRequest[0] === 1) {
                                            return res.status(422).json({ message: "service request refunded successfully" });
                                        }
                                        else {
                                            return res.status(422).json({ message: "amount not refunded" });
                                        }
                                    }
                                    else {
                                        return res.status(404).json({ message: "service request not found or service request not completed or service request already refunded" });
                                    }
                                })
                                    .catch(function (error) {
                                    console.log(error);
                                    return res.status(500).json({ error: error });
                                })];
                        }
                        else {
                            return [2 /*return*/, res.status(401).json({ message: "refund amount must be less than paid amount" })];
                        }
                    }
                }
                else {
                    return [2 /*return*/, res.status(401).json({ message: "unauthorised User" })];
                }
                return [2 /*return*/];
            });
        }); };
        this.userManagementService = userManagementService;
    }
    return UserManagementController;
}());
exports.UserManagementController = UserManagementController;
