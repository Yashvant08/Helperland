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
exports.LoginController = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcrypt_1 = __importDefault(require("bcrypt"));
require("dotenv").config();
var LoginController = /** @class */ (function () {
    function LoginController(loginService) {
        var _this = this;
        this.loginService = loginService;
        this.checkLogin = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.loginService
                        .getUserByEmail(req.body.Email)
                        .then(function (user) { return __awaiter(_this, void 0, void 0, function () {
                        var register, isSame, token;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!user) return [3 /*break*/, 3];
                                    register = this.loginService.isRegister(user);
                                    if (!register) return [3 /*break*/, 2];
                                    return [4 /*yield*/, bcrypt_1.default.compare(req.body.Password, user.Password)];
                                case 1:
                                    isSame = _a.sent();
                                    if (isSame) {
                                        token = this.loginService.createToken(user.Email);
                                        if (user.UserTypeId === 1) {
                                            return [2 /*return*/, res
                                                    .status(200)
                                                    .cookie("token", token, { httpOnly: true, expires: new Date(Date.now() + 600000) })
                                                    .json({ message: "login successful super user" })];
                                        }
                                        else if (user.UserTypeId === 2) {
                                            return [2 /*return*/, res
                                                    .status(200)
                                                    .cookie("token", token, { httpOnly: true, expires: new Date(Date.now() + 600000) })
                                                    .json({ message: "login successful admin" })];
                                        }
                                        else if (user.UserTypeId === 3) {
                                            return [2 /*return*/, res
                                                    .status(200)
                                                    .cookie("token", token, { httpOnly: true, expires: new Date(Date.now() + 600000) })
                                                    .json({ message: "login successful helper" })];
                                        }
                                        else {
                                            return [2 /*return*/, res
                                                    .status(200)
                                                    .cookie("token", token, { httpOnly: true, expires: new Date(Date.now() + 600000) })
                                                    .json({ message: "login successful user" })];
                                        }
                                    }
                                    return [2 /*return*/, res
                                            .status(401)
                                            .json({ message: "Invalid Username or Password" })];
                                case 2: return [2 /*return*/, res.json({ message: "Active your account" })];
                                case 3: return [2 /*return*/, res
                                        .status(401)
                                        .json({ message: "Invalid Username or Password" })];
                            }
                        });
                    }); })
                        .catch(function (error) {
                        console.log(error);
                        return res.status(500).json({
                            error: error,
                        });
                    })];
            });
        }); };
        this.validateToken = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var token;
            var _this = this;
            return __generator(this, function (_a) {
                token = req.headers.authorization;
                if (token == null) {
                    return [2 /*return*/, res.status(401).json({ message: "invalid login credential null" })];
                }
                jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, function (err, user) {
                    if (err) {
                        return res.status(401).json({ message: 'invalid login credential' });
                    }
                    else {
                        return _this.loginService.getUserByEmail(user.userEmail)
                            .then(function (user) {
                            if (user === null) {
                                return res.status(401).json({ message: 'Unauthorised user' });
                            }
                            else {
                                if (user.IsRegisteredUser === true) {
                                    console.log(user.IsRegisteredUser);
                                    next();
                                }
                                else {
                                    return res.status(401).json({ message: 'Activate your account' });
                                }
                            }
                        })
                            .catch(function (error) {
                            console.log(error);
                            return res.status(500).json({
                                error: error,
                            });
                        });
                    }
                });
                return [2 /*return*/];
            });
        }); };
        this.removeToken = function (req, res) {
            try {
                res.clearCookie('token');
                return res.status(200).json({ message: 'successfully logout' });
            }
            catch (error) {
                return res.status(401).json({ message: 'failed' });
            }
        };
        this.loginService = loginService;
    }
    return LoginController;
}());
exports.LoginController = LoginController;
