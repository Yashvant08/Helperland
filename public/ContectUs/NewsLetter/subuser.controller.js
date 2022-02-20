"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.SubUserController = void 0;
var mailgun_js_1 = __importDefault(require("mailgun-js"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
var DOMAIN = process.env.MAILGUN_DOMAIN;
var mg = (0, mailgun_js_1.default)({
    apiKey: process.env.MAILGUN_API,
    domain: DOMAIN,
});
var SubUserController = /** @class */ (function () {
    function SubUserController(subUserService) {
        var _this = this;
        this.subUserService = subUserService;
        this.createSubUser = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var Email;
            var _this = this;
            return __generator(this, function (_a) {
                Email = req.body.Email;
                req.body.IsConfirmedSub = false;
                if (Email) {
                    return [2 /*return*/, this.subUserService.getSubUserByEmail(Email)
                            .then(function (user) {
                            if (!user) {
                                return _this.subUserService.createSubUser(req.body)
                                    .then(function (user) {
                                    var token = _this.subUserService.createToken(user.Email);
                                    var data = _this.subUserService.createData(user.Email, token);
                                    mg.messages().send(data, function (error, body) {
                                        if (error) {
                                            return res.json({
                                                error: error.message,
                                            });
                                        }
                                    });
                                    return res.status(200).json({
                                        message: "Confirmation link has been sent to you Email ID",
                                    });
                                })
                                    .catch(function (error) {
                                    console.log(error);
                                    return res.status(500).json({
                                        error: error
                                    });
                                });
                            }
                            else {
                                return res.status(400).json({ mesage: 'You can subscribe only one time' });
                            }
                        })
                            .catch(function (error) {
                            return res.status(500).json({
                                error: error
                            });
                        })];
                }
                else {
                    return [2 /*return*/, res.status(401).json({ mesage: 'something went wrong' })];
                }
                return [2 /*return*/];
            });
        }); };
        this.subConfirmation = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var token;
            var _this = this;
            return __generator(this, function (_a) {
                token = req.params.token;
                if (token) {
                    jsonwebtoken_1.default.verify(token, process.env.JWT_ACC_ACTIVATE, function (error, decodedToken) {
                        if (error) {
                            return res.status(400).json({ error: "Incorrect or Expired link" });
                        }
                        else {
                            var Email = decodedToken.Email;
                            if (Email) {
                                return _this.subUserService
                                    .getSubUserByEmail(Email)
                                    .then(function (subUser) {
                                    if (subUser) {
                                        subUser.IsConfirmedSub = true;
                                        return _this.subUserService
                                            .updateSubUser(subUser.IsConfirmedSub, subUser.Email)
                                            .then(function (user) {
                                            return res.status(200).json({
                                                message: "You are now successfully registered",
                                                user: user
                                            });
                                        })
                                            .catch(function (error) {
                                            console.log(error);
                                            return res.status(500).json(error);
                                        });
                                    }
                                })
                                    .catch(function (error) {
                                    console.log(error);
                                    return res.status(500).json(error);
                                });
                            }
                            else {
                                return res.status(401).json({ mesage: 'Email not found' });
                            }
                        }
                    });
                    return [2 /*return*/, res];
                }
                else {
                    return [2 /*return*/, res.status(401).json({ mesage: 'token not found' })];
                }
                return [2 /*return*/];
            });
        }); };
        this.sendEmailToAll = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.subUserService
                        .getSubUsers()
                        .then(function (SubUser) { return __awaiter(_this, void 0, void 0, function () {
                        var user, email, subUser, _a, _b, _i, e, data;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    if (!(SubUser.length <= 0)) return [3 /*break*/, 1];
                                    return [2 /*return*/, res.status(200).json({ message: 'user not found' })];
                                case 1:
                                    user = __assign({}, __assign({}, SubUser));
                                    email = [];
                                    for (subUser in user) {
                                        if (user[subUser].IsConfirmedSub === true) {
                                            email.push((user[subUser].Email));
                                        }
                                    }
                                    ;
                                    console.log(email);
                                    _a = [];
                                    for (_b in email)
                                        _a.push(_b);
                                    _i = 0;
                                    _c.label = 2;
                                case 2:
                                    if (!(_i < _a.length)) return [3 /*break*/, 5];
                                    e = _a[_i];
                                    data = this.subUserService.createDataForAll(email[e]);
                                    return [4 /*yield*/, mg.messages().send(data, function (error, body) {
                                            if (error) {
                                                return res.json({
                                                    error: error.message,
                                                });
                                            }
                                        })];
                                case 3:
                                    _c.sent();
                                    _c.label = 4;
                                case 4:
                                    _i++;
                                    return [3 /*break*/, 2];
                                case 5: return [2 /*return*/, res.status(200).json({ message: 'mail sent successfully' })];
                            }
                        });
                    }); })
                        .catch(function (error) {
                        return res.status(500).json({
                            error: error
                        });
                    })];
            });
        }); };
        this.getSubUserberById = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.subUserService
                        .getSubUserById(+req.params.id)
                        .then(function (subUser) {
                        if (subUser) {
                            return res.status(200).json(subUser);
                        }
                        else {
                            return res.status(404).json({ error: 'NotFound' });
                        }
                    })
                        .catch(function (error) {
                        return res.status(500).json({
                            error: error
                        });
                    })];
            });
        }); };
        this.getAllSubUsers = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.subUserService
                        .getSubUsers()
                        .then(function (SubUser) {
                        return res.status(200).json({ SubUser: SubUser });
                    })
                        .catch(function (error) {
                        return res.status(500).json({
                            error: error
                        });
                    })];
            });
        }); };
        this.subUserService = subUserService;
    }
    return SubUserController;
}());
exports.SubUserController = SubUserController;
