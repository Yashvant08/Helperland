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
exports.UsersService = void 0;
var UsersService = /** @class */ (function () {
    function UsersService(usersRepository) {
        this.usersRepository = usersRepository;
        this.usersRepository = usersRepository;
    }
    UsersService.prototype.createUsers = function (users) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.usersRepository.createUsers(users)];
            });
        });
    };
    UsersService.prototype.getUserById = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.usersRepository.getUserById(userId)];
            });
        });
    };
    UsersService.prototype.getUserByEmail = function (userEmail) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.usersRepository.getUserByEmail(userEmail)];
            });
        });
    };
    UsersService.prototype.getUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.usersRepository.getUsers()];
            });
        });
    };
    UsersService.prototype.updateUsers = function (users, userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.usersRepository.updateUsers(users, userId)];
            });
        });
    };
    UsersService.prototype.deleteUsers = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.usersRepository.deleteUsers(userId)];
            });
        });
    };
    UsersService.prototype.createData = function (adminEmail, Name, email, subject, mobile, message) {
        var data = {
            from: 'yashvantdesai7@gmail.com',
            to: adminEmail,
            subject: 'ContactUs',
            html: "\n                <h1>\u201CBelow user want's to reach us\u201D.</h1>\n                <p>Name    : ".concat(Name, "</p>\n                <p>Email   : ").concat(email, "</p>\n                <p>Subject : ").concat(subject, "</p>\n                <p>Mobile  : ").concat(mobile, "</p>\n                <p>Message : ").concat(message, "</p>\n                ")
        };
        return data;
    };
    ;
    UsersService.prototype.getAllAdminEmails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var adminEmails, admins, ad;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        adminEmails = [];
                        return [4 /*yield*/, this.usersRepository.getAdminUser()];
                    case 1:
                        admins = _a.sent();
                        if (admins && admins.length > 0) {
                            for (ad in admins) {
                                adminEmails.push(admins[ad].Email);
                            }
                        }
                        return [2 /*return*/, adminEmails];
                }
            });
        });
    };
    return UsersService;
}());
exports.UsersService = UsersService;
