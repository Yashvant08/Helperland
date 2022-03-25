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
exports.BookService = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var moment_1 = __importDefault(require("moment"));
var BookService = /** @class */ (function () {
    function BookService(bookServiceRepository) {
        this.bookServiceRepository = bookServiceRepository;
        this.bookServiceRepository = bookServiceRepository;
    }
    BookService.prototype.createUserAddress = function (userAddress) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.bookServiceRepository.createUserAddress(userAddress)];
            });
        });
    };
    BookService.prototype.getUserAddress = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.bookServiceRepository.getUserAddresses(userId)];
            });
        });
    };
    BookService.prototype.createFavoriteAndBlocked = function (fandb) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.bookServiceRepository.createFavoriteAndBlocked(fandb)];
            });
        });
    };
    BookService.prototype.getFavoriteAndBlocked = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.bookServiceRepository.getFavoriteAndBlocked(userId)];
            });
        });
    };
    BookService.prototype.getUserById = function (userId, zipCode) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.bookServiceRepository.getUserById(userId, zipCode)];
            });
        });
    };
    BookService.prototype.getHelperById = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.bookServiceRepository.getHelperById(userId)];
            });
        });
    };
    BookService.prototype.getAllHelper = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.bookServiceRepository.getAllHelper()];
            });
        });
    };
    BookService.prototype.getUserByEmail = function (userEmail) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.bookServiceRepository.getUserByEmail(userEmail)];
            });
        });
    };
    //ServiceRequest services
    BookService.prototype.createServiceRequestWithAddress = function (serviceRequest) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.bookServiceRepository.createServiceRequestWithAddress(serviceRequest)];
            });
        });
    };
    BookService.prototype.getHelpersByZipCode = function (zipCode) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.bookServiceRepository.getHelpersByZipcode(zipCode)];
            });
        });
    };
    BookService.prototype.getBlockedHelper = function (userId, helpers) {
        return __awaiter(this, void 0, void 0, function () {
            var helperIds, us;
            return __generator(this, function (_a) {
                helperIds = [];
                for (us in helpers) {
                    helperIds.push(helpers[us].UserId);
                }
                return [2 /*return*/, this.bookServiceRepository.getBlockedHelper(userId, helperIds)];
            });
        });
    };
    //Advance Servics
    BookService.prototype.getSubTotal = function (serviceHourlyRate, serviceHour) {
        var subTotal = serviceHourlyRate * serviceHour;
        return subTotal;
    };
    BookService.prototype.getTotalCost = function (ExtraService, SubTotal) {
        var TotalCost = ExtraService.length * 9 + SubTotal;
        return TotalCost;
    };
    BookService.prototype.createDataForAll = function (userEmail) {
        var data = {
            from: 'yashvantdesai7@gmail.com',
            to: userEmail,
            subject: 'About new service in your area',
            html: "\n            <h1>New service is available in your area login and accept before anyone accept it.</h1>\n            "
        };
        return data;
    };
    BookService.prototype.createData = function (userEmail, srId) {
        var data = {
            from: 'yashvantdesai7@gmail.com',
            to: userEmail,
            subject: 'About new service allocation',
            html: "\n            <h1>A service request ".concat(srId, " has been directly assigned to you.</h1>\n            ")
        };
        return data;
    };
    BookService.prototype.createToken = function (userEmail, postalCode) {
        var token = jsonwebtoken_1.default.sign({ userEmail: userEmail, postalCode: postalCode }, process.env.SECRET_KEY, {
            expiresIn: "5h",
        });
        return token;
    };
    BookService.prototype.getTargetUser = function (user, zipCode) {
        return __awaiter(this, void 0, void 0, function () {
            var helperId, favoriteSpDetail, us, helperblock, favoriteSP, _a, _b, _i, sp, spDetail;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        helperId = [];
                        favoriteSpDetail = [];
                        for (us in user) {
                            helperId.push(user[us].TargetUserId);
                        }
                        return [4 /*yield*/, this.bookServiceRepository.getAllBlockedCustomerOfHelper(helperId)];
                    case 1:
                        helperblock = _c.sent();
                        favoriteSP = user.filter(function (ar) { return !helperblock.find(function (rm) { return (rm.UserId === ar.TargetUserId && ar.UserId === rm.TargetUserId); }); });
                        _a = [];
                        for (_b in favoriteSP)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        sp = _a[_i];
                        return [4 /*yield*/, this.bookServiceRepository.getHelperById(favoriteSP[sp].TargetUserId)];
                    case 3:
                        spDetail = _c.sent();
                        if (spDetail && spDetail.ZipCode === zipCode) {
                            favoriteSpDetail.push({
                                ServiceProviderId: spDetail.UserId,
                                ServiceProviderName: spDetail.FirstName + " " + spDetail.LastName,
                                ProfilePicture: spDetail.UserProfilePicture
                            });
                        }
                        _c.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, favoriteSpDetail];
                }
            });
        });
    };
    BookService.prototype.getEmailAddressForSendEmail = function (user, body) {
        var Email = [];
        if (body.HasPets === true) {
            console.log("hi");
            for (var count in user) {
                if (user[count].WorksWithPets === true)
                    Email.push(user[count].Email);
            }
        }
        else {
            console.log("h2");
            for (var count in user) {
                Email.push(user[count].Email);
            }
        }
        return Email;
    };
    BookService.prototype.removeBlockedHelper = function (user, blockedHelpers) {
        var users = user.filter(function (item) {
            return blockedHelpers.every(function (f) {
                return f.TargetUserId !== item.UserId;
            });
        });
        return users;
    };
    BookService.prototype.compareDateWithCurrentDate = function (date) {
        return __awaiter(this, void 0, void 0, function () {
            var formatedDate1, formatedDate2;
            return __generator(this, function (_a) {
                formatedDate1 = new Date(date.split("-").reverse().join("-"));
                formatedDate2 = new Date((0, moment_1.default)(new Date()).format("YYYY-MM-DD"));
                if (formatedDate1 > formatedDate2) {
                    return [2 /*return*/, true];
                }
                else {
                    return [2 /*return*/, false];
                }
                return [2 /*return*/];
            });
        });
    };
    ;
    BookService.prototype.removeHelperBlockedLoginCustomer = function (userId, helpers) {
        return __awaiter(this, void 0, void 0, function () {
            var helperIds, hp, blockedCustomer, filteredHelper;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        helperIds = [];
                        // console.log(helpers);
                        for (hp in helpers) {
                            helperIds.push(helpers[hp].UserId);
                        }
                        return [4 /*yield*/, this.bookServiceRepository.getHelpersBlockedCustomer(userId, helperIds)];
                    case 1:
                        blockedCustomer = _a.sent();
                        filteredHelper = helpers.filter(function (sr) {
                            return !blockedCustomer.find(function (rm) {
                                return (rm.UserId === sr.UserId);
                            });
                        });
                        // console.log(filteredHelper);
                        return [2 /*return*/, filteredHelper];
                }
            });
        });
    };
    BookService.prototype.saveServiceRequestDetail = function (requestDetail, email) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.bookServiceRepository.getUserByEmail(email)];
                    case 1:
                        user = _a.sent();
                        if (user) {
                            requestDetail.Email = email;
                            requestDetail.UserId = user.UserId;
                            requestDetail.Status = 1;
                            requestDetail.ModifiedBy = user.UserId;
                            requestDetail.ServiceHourlyRate = 18;
                            requestDetail.ExtraHours = requestDetail.ExtraService.length * 0.5;
                            requestDetail.SubTotal = requestDetail.ServiceHourlyRate * requestDetail.ServiceHours;
                            requestDetail.TotalCost = requestDetail.ExtraService.length * 9 + requestDetail.SubTotal;
                            return [2 /*return*/, this.bookServiceRepository.saveServiceRequestDetail(requestDetail)];
                        }
                        else {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    BookService.prototype.createServiceRequestAddress = function (requestId, addressId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var alreadyAvailAddress, address, srAddress;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.bookServiceRepository.getServiceRequestAddress(requestId)];
                    case 1:
                        alreadyAvailAddress = _a.sent();
                        console.log(alreadyAvailAddress);
                        if (!alreadyAvailAddress) return [3 /*break*/, 2];
                        return [2 /*return*/, null];
                    case 2: return [4 /*yield*/, this.bookServiceRepository.getUserAddressById(addressId)];
                    case 3:
                        address = _a.sent();
                        if (address && address.UserId === userId) {
                            srAddress = JSON.parse(JSON.stringify(address));
                            srAddress.ServiceRequestId = requestId;
                            return [2 /*return*/, this.bookServiceRepository.createSRAddress(srAddress)];
                        }
                        else {
                            return [2 /*return*/, null];
                        }
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BookService.prototype.completeServiceRequest = function (spId, srId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.bookServiceRepository.completeServiceRequest(spId, srId)];
            });
        });
    };
    return BookService;
}());
exports.BookService = BookService;
