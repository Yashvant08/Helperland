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
exports.HelpersController = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcrypt_1 = __importDefault(require("bcrypt"));
require("dotenv").config();
var saltRounds = 10;
var UserTypeId = 3;
var mailgun_js_1 = __importDefault(require("mailgun-js"));
var DOMAIN = process.env.MAILGUN_DOMAIN;
var mg = (0, mailgun_js_1.default)({
    apiKey: process.env.MAILGUN_API,
    domain: DOMAIN,
});
var HelpersController = /** @class */ (function () {
    function HelpersController(helpersService) {
        var _this = this;
        this.helpersService = helpersService;
        this.createHelper = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var same;
            var _this = this;
            return __generator(this, function (_a) {
                req.body.UserTypeId = UserTypeId;
                req.body.IsRegisteredUser = false;
                same = req.body.Password === req.body.ConfirmPassword;
                if (!same) {
                    return [2 /*return*/, res.status(400).json({ message: "Password does not match " })];
                }
                else {
                    return [2 /*return*/, this.helpersService
                            .getHelperByEmail(req.body.Email)
                            .then(function (helper) {
                            if (helper) {
                                return res
                                    .status(400)
                                    .json({ message: "Email already registered" });
                            }
                            return _this.helpersService
                                .getHelperByMobile(req.body.Mobile)
                                .then(function (helper) { return __awaiter(_this, void 0, void 0, function () {
                                var _a;
                                var _this = this;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            if (helper) {
                                                return [2 /*return*/, res
                                                        .status(400)
                                                        .json({ message: "Mobile already registered" })];
                                            }
                                            _a = req.body;
                                            return [4 /*yield*/, bcrypt_1.default.hash(req.body.Password, saltRounds)];
                                        case 1:
                                            _a.Password = _b.sent();
                                            return [2 /*return*/, this.helpersService
                                                    .createHelper(req.body)
                                                    .then(function (helper) {
                                                    var token = _this.helpersService.createToken(helper.Email);
                                                    var data = _this.helpersService.createData(helper.Email, token);
                                                    mg.messages().send(data, function (error, body) {
                                                        if (error) {
                                                            return res.json({
                                                                error: error.message,
                                                            });
                                                        }
                                                    });
                                                    return res.status(200).json({
                                                        message: "Email successfully sent, kindly active your account",
                                                    });
                                                })
                                                    .catch(function (error) {
                                                    console.log(error);
                                                    return res.status(500).json({
                                                        error: error,
                                                    });
                                                })];
                                    }
                                });
                            }); })
                                .catch(function (error) {
                                console.log(error);
                                return res.status(500).json(error);
                            });
                        })
                            .catch(function (error) {
                            console.log(error);
                            return res.status(500).json(error);
                        })];
                }
                return [2 /*return*/];
            });
        }); };
        this.activateAccount = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var token;
            var _this = this;
            return __generator(this, function (_a) {
                token = req.params.token;
                if (token) {
                    jsonwebtoken_1.default.verify(token, process.env.JWT_ACC_ACTIVATE, function (error, decodedToken) {
                        if (error) {
                            return res.status(400).json({ error: "Incorrect or Expired link" });
                        }
                        var helperEmail = decodedToken.helperEmail;
                        if (helperEmail) {
                            return _this.helpersService
                                .getHelperByEmail(helperEmail)
                                .then(function (helper) {
                                if (helper) {
                                    helper.IsRegisteredUser = true;
                                    return _this.helpersService
                                        .updateHelper(helper.IsRegisteredUser, helper.Email)
                                        .then(function (helper) {
                                        return res.status(200).json({
                                            message: "You are now successfully registered as a helper",
                                            helper: helper
                                        });
                                    })
                                        .catch(function (error) {
                                        console.log(error);
                                        return res.status(500).json(error);
                                    });
                                }
                                return res.json({ error: "Something went wrong!!!" });
                            })
                                .catch(function (error) {
                                console.log(error);
                                return res.status(500).json(error);
                            });
                        }
                        return res.json({ error: "Something went wrong!!!" });
                    });
                }
                else {
                    return [2 /*return*/, res.json({ error: "Something went wrong!!!" })];
                }
                return [2 /*return*/];
            });
        }); };
        this.helpersService = helpersService;
    }
    return HelpersController;
}());
exports.HelpersController = HelpersController;
