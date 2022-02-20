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
exports.SubUserService = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var SubUserService = /** @class */ (function () {
    function SubUserService(subUserRepository) {
        this.subUserRepository = subUserRepository;
        this.subUserRepository = subUserRepository;
    }
    SubUserService.prototype.createSubUser = function (subUser) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.subUserRepository.createSubUser(subUser)];
            });
        });
    };
    SubUserService.prototype.getSubUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.subUserRepository.getSubUsers()];
            });
        });
    };
    SubUserService.prototype.getSubUserById = function (subUserId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.subUserRepository.getSubUserById(subUserId)];
            });
        });
    };
    SubUserService.prototype.getSubUserByEmail = function (subUserEmail) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.subUserRepository.getSubUserByEmail(subUserEmail)];
            });
        });
    };
    SubUserService.prototype.createData = function (userEmail, token) {
        var data = {
            from: 'Helperland Team@gmail.com',
            to: userEmail,
            subject: 'Newsletter confirmation, entry in our mailing list',
            html: "\n                <html>\n                    <head>\n                        <style>\n                        a{\n                        background-color: #f44336;\n                        color: white;\n                        padding: 14px 25px;\n                        text-align: center;\n                        text-decoration: none;\n                        display: inline-block;\n                        }\n                        \n                        a:hover, a:active {\n                        background-color: red;\n                        }\n                        </style>\n                    </head>\n                    <body>\n                        <h1>Hello,</h1>\n                        </br>\n                        </br>\n                        <h2>Application for newsletter subscription</h2>\n                        </br>\n                        <h2>Thank you, we have received your registration for the newsletter. To confirm that you would like to receive the newsletter by email, please click on the following button:</h2>\n                        </br>\n                        <a href=\"".concat(process.env.CLIENT_URL, "/sb-User/activate/").concat(token, "\">confirm subscription</a>\n                        </br>\n                        <h2>Many greetings</h2>\n                        </br>\n                        <h2>your Helperland team</h2>\n                    </body>\n                </html>\n                ")
        };
        return data;
    };
    SubUserService.prototype.createDataForAll = function (userEmail) {
        var data = {
            from: 'Helperland Team@gmail.com',
            to: userEmail,
            subject: 'Newsletter confirmation, entry in our mailing list',
            html: "\n                <h1>Hello,</h1>\n                "
        };
        return data;
    };
    SubUserService.prototype.createToken = function (Email) {
        var token = jsonwebtoken_1.default.sign({ Email: Email }, process.env.JWT_ACC_ACTIVATE, { expiresIn: '1h' });
        return token;
    };
    SubUserService.prototype.updateSubUser = function (IsConfirmedSub, Email) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.subUserRepository.updateSubUser(IsConfirmedSub, Email)];
            });
        });
    };
    return SubUserService;
}());
exports.SubUserService = SubUserService;
