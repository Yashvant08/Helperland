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
exports.BlockCustomerController = void 0;
var mailgun_js_1 = __importDefault(require("mailgun-js"));
require("dotenv").config();
var DOMAIN = process.env.MAILGUN_DOMAIN;
var mg = (0, mailgun_js_1.default)({
    apiKey: process.env.MAILGUN_API,
    domain: DOMAIN,
});
var BlockCustomerController = /** @class */ (function () {
    function BlockCustomerController(blockCustomerService) {
        var _this = this;
        this.blockCustomerService = blockCustomerService;
        this.getCustomerWorkedWithHelper = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var customers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(req.body.userTypeId === 3 && req.body.userId)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.blockCustomerService.getCustomerWorkedWithHelper(req.body.userId)];
                    case 1:
                        customers = _a.sent();
                        if (customers) {
                            if (customers.length > 0) {
                                return [2 /*return*/, res.status(200).json(customers)];
                            }
                            else {
                                return [2 /*return*/, res.status(401).json({ message: "customers not found" })];
                            }
                        }
                        else {
                            return [2 /*return*/, res.status(404).json({ message: "customers not found" })];
                        }
                        return [3 /*break*/, 3];
                    case 2: return [2 /*return*/, res.status(401).json({ message: "Unauthorised User" })];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.addCustomerInBlockList = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var inCustomerList;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(req.body.userTypeId === 3 && req.body.userId)) return [3 /*break*/, 4];
                        req.body.TargetUserId = req.params.userId;
                        if (!req.body.IsBlocked) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.blockCustomerService.hasHelperWorkedForCustomer(req.body.userId, req.params.userId)];
                    case 1:
                        inCustomerList = _a.sent();
                        if (inCustomerList) {
                            return [2 /*return*/, this.blockCustomerService.getBlockedCustomer(req.body.userId, req.params.userId)
                                    .then(function (blockedCustomer) {
                                    if (blockedCustomer && blockedCustomer.IsBlocked) {
                                        return res.status(201).json({ message: 'customer alraedy in blocked list' });
                                    }
                                    else if (blockedCustomer && blockedCustomer.IsBlocked === false) {
                                        return _this.blockCustomerService.updateBlockedCustomer(req.body.userId, req.params.userId)
                                            .then(function (updatedCustomer) {
                                            if (updatedCustomer[0] === 1) {
                                                return res.status(200).json({ message: 'customer successfull added in block list' });
                                            }
                                            else {
                                                return res.status(422).json({ message: 'error in adding blocked list' });
                                            }
                                        })
                                            .catch(function (error) {
                                            console.log(error);
                                            return res.status(500).json({ error: error });
                                        });
                                    }
                                    else {
                                        req.body.UserId = req.body.userId;
                                        req.body.IsFavorite = false;
                                        return _this.blockCustomerService.createBlockUnblockCustomer(req.body)
                                            .then(function (createdBlockedCustomer) {
                                            if (createdBlockedCustomer) {
                                                return res.status(200).json(createdBlockedCustomer);
                                            }
                                            else {
                                                return res.status(404).json({ message: 'error in creating data' });
                                            }
                                        })
                                            .catch(function (error) {
                                            console.log(error);
                                            return res.status(500).json({ error: error });
                                        });
                                    }
                                })
                                    .catch(function (error) {
                                    console.log(error);
                                    return res.status(500).json({ error: error });
                                })];
                        }
                        else {
                            return [2 /*return*/, res.status(400).json({ message: 'helper has not worked for this customer' })];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        next();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4: return [2 /*return*/, res.status(401).json({ message: "Unauthorised User" })];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.removeCustomerFromBlockList = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (req.body.IsBlocked === false) {
                    return [2 /*return*/, this.blockCustomerService.getBlockedCustomer(req.body.userId, req.params.userId)
                            .then(function (blockedCustomer) {
                            if (blockedCustomer && blockedCustomer.IsBlocked) {
                                return _this.blockCustomerService.updateUnBlockedCustomer(req.body.userId, req.params.userId)
                                    .then(function (updatedCustomer) {
                                    if (updatedCustomer[0] === 1) {
                                        return res.status(200).json({ message: 'customer successfull added in unblock list' });
                                    }
                                    else {
                                        return res.status(422).json({ message: 'error in adding unblocke list' });
                                    }
                                })
                                    .catch(function (error) {
                                    console.log(error);
                                    return res.status(500).json({ error: error });
                                });
                            }
                            else if (blockedCustomer && blockedCustomer.IsBlocked === false) {
                                return res.status(201).json({ message: 'customer alraedy in unblocke list' });
                            }
                            else {
                                return res.status(404).json({ message: 'no customer in blocklist to unblock' });
                            }
                        })
                            .catch(function (error) {
                            console.log(error);
                            return res.status(500).json({ error: error });
                        })];
                }
                else {
                    return [2 /*return*/, res.status(400).json({ message: 'proper input not found in request body' })];
                }
                return [2 /*return*/];
            });
        }); };
        this.blockCustomerService = blockCustomerService;
    }
    return BlockCustomerController;
}());
exports.BlockCustomerController = BlockCustomerController;
