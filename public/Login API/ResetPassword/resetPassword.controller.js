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
exports.ResetController = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var nodemailer_1 = __importDefault(require("nodemailer"));
// import mailgun from "mailgun-js";
require("dotenv").config();
// const DOMAIN: string = process.env.MAILGUN_DOMAIN!;
// const mg = mailgun({
//   apiKey: process.env.MAILGUN_API!,
//   domain: DOMAIN,
// });
var transporter = nodemailer_1.default.createTransport({
    service: process.env.SERVICE,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS,
    },
});
var saltRounds = 10;
var ResetController = /** @class */ (function () {
    function ResetController(resetService) {
        var _this = this;
        this.resetService = resetService;
        this.forgotPassword = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var Email;
            var _this = this;
            return __generator(this, function (_a) {
                Email = req.body.Email;
                if (Email) {
                    return [2 /*return*/, this.resetService
                            .getUserByEmail(Email)
                            .then(function (user) {
                            if (!user) {
                                return res
                                    .status(400)
                                    .json({ message: "User with this email does not exist" });
                            }
                            var resetLink = _this.resetService.createToken(user.UserId);
                            var data = _this.resetService.createData(user.Email, resetLink);
                            transporter.sendMail(data, function (error, body) {
                                if (error) {
                                    return res.json({
                                        error: error.message,
                                    });
                                }
                            });
                            return res
                                .status(200)
                                .json({
                                message: "An email has been sent to your account. Click on the link in received email to reset the password",
                            });
                        })
                            .catch(function (error) {
                            console.log(error);
                            return res.status(500).json(error);
                        })];
                }
                else {
                    return [2 /*return*/, res.status(400).json({ message: "Email does not exist" })];
                }
                return [2 /*return*/];
            });
        }); };
        this.resetPassword = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var resetLink;
            var _this = this;
            return __generator(this, function (_a) {
                resetLink = req.body.resetLink;
                if (resetLink) {
                    jsonwebtoken_1.default.verify(resetLink, process.env.FORGOT_PASSWORD, function (error, decodedlink) {
                        if (error) {
                            return res
                                .status(401)
                                .json({ message: "Incorrect or expired token" });
                        }
                        var userId = decodedlink.userId;
                        return _this.resetService
                            .getUserById(userId)
                            .then(function (user) { return __awaiter(_this, void 0, void 0, function () {
                            var isSame, _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        if (!user) {
                                            return [2 /*return*/, res
                                                    .status(400)
                                                    .json({ error: "User with this token does not exist" })];
                                        }
                                        return [4 /*yield*/, bcrypt_1.default.compare(req.body.newPassword, user.Password)];
                                    case 1:
                                        isSame = _b.sent();
                                        if (!isSame) return [3 /*break*/, 2];
                                        return [2 /*return*/, res
                                                .status(200)
                                                .json({
                                                message: "You used that password recently. Choose different password",
                                            })];
                                    case 2:
                                        _a = user;
                                        return [4 /*yield*/, bcrypt_1.default.hash(req.body.newPassword, saltRounds)];
                                    case 3:
                                        _a.Password = _b.sent();
                                        return [2 /*return*/, this.resetService
                                                .updateUser(user.Password, user.UserId)
                                                .then(function (user) {
                                                return res
                                                    .status(200)
                                                    .json({ message: "password successfully changed", user: user });
                                            })
                                                .catch(function (error) {
                                                console.log(error);
                                                return res.status(500).json(error);
                                            })];
                                }
                            });
                        }); })
                            .catch(function (error) {
                            console.log(error);
                            return res.status(500).json(error);
                        });
                    });
                }
                else {
                    return [2 /*return*/, res.status(400).json({ message: "something went wrong" })];
                }
                return [2 /*return*/];
            });
        }); };
        this.resetService = resetService;
    }
    return ResetController;
}());
exports.ResetController = ResetController;
