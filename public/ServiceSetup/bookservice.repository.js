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
exports.BookServiceRepository = void 0;
var index_1 = require("../models/index");
var sequelize_1 = require("sequelize");
var BookServiceRepository = /** @class */ (function () {
    function BookServiceRepository() {
    }
    BookServiceRepository.prototype.createUserAddress = function (userAddress) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, index_1.db.UserAddress.create(userAddress)];
            });
        });
    };
    BookServiceRepository.prototype.getUserAddresses = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, index_1.db.UserAddress.findAll({ where: { UserId: userId } })];
            });
        });
    };
    BookServiceRepository.prototype.createFavoriteAndBlocked = function (fandb) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, index_1.db.FavoriteAndBlocked.create(fandb)];
            });
        });
    };
    BookServiceRepository.prototype.getFavoriteAndBlocked = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, index_1.db.FavoriteAndBlocked.findAll({ where: { UserId: userId, IsFavorite: true, IsBlocked: false } })];
            });
        });
    };
    BookServiceRepository.prototype.getAllBlockedCustomerOfHelper = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                return [2 /*return*/, index_1.db.FavoriteAndBlocked.findAll({ where: { UserId: (_a = {}, _a[sequelize_1.Op.or] = userId, _a), IsBlocked: true } })];
            });
        });
    };
    BookServiceRepository.prototype.getUserById = function (userId, zipCode) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, index_1.db.User.findAll({ where: { UserId: userId, ZipCode: zipCode } })];
            });
        });
    };
    BookServiceRepository.prototype.getHelperById = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, index_1.db.User.findOne({ where: { UserId: userId, UserTypeId: 3 } })];
            });
        });
    };
    BookServiceRepository.prototype.getUserByEmail = function (userEmail) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, index_1.db.User.findOne({ where: { Email: userEmail } })];
            });
        });
    };
    BookServiceRepository.prototype.getHelpersByZipcode = function (zipCode) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, index_1.db.User.findAll({ where: { UserTypeId: 3, ZipCode: zipCode }, include: 'TargetUserId' })];
            });
        });
    };
    BookServiceRepository.prototype.getAllHelper = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, index_1.db.User.findAll({ where: { UserTypeId: 3 } })];
            });
        });
    };
    BookServiceRepository.prototype.getHelpersBlockedCustomer = function (userId, helprId) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                return [2 /*return*/, index_1.db.FavoriteAndBlocked.findAll({ where: { UserId: (_a = {}, _a[sequelize_1.Op.or] = helprId, _a), TargetUserId: userId, IsBlocked: true } })];
            });
        });
    };
    BookServiceRepository.prototype.saveServiceRequestDetail = function (requestDetail) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, index_1.db.ServiceRequest.create(requestDetail, { include: ['ExtraService'] })];
            });
        });
    };
    BookServiceRepository.prototype.getUserAddressById = function (addressId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, index_1.db.UserAddress.findOne({ where: { AddressId: addressId } })];
            });
        });
    };
    BookServiceRepository.prototype.createSRAddress = function (srAddress) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, index_1.db.SRAddress.create(srAddress)];
            });
        });
    };
    BookServiceRepository.prototype.getServiceRequestAddress = function (srId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, index_1.db.SRAddress.findOne({ where: { ServiceRequestId: srId } })];
            });
        });
    };
    BookServiceRepository.prototype.completeServiceRequest = function (spId, srId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, index_1.db.ServiceRequest.update({
                        ServiceProviderId: spId,
                        Status: 2,
                        SPAcceptedDate: new Date()
                    }, { where: { ServiceRequestId: srId } })];
            });
        });
    };
    //Service Request methods
    BookServiceRepository.prototype.createServiceRequest = function (ServiceRequest) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, index_1.db.ServiceRequest.create(ServiceRequest)];
            });
        });
    };
    BookServiceRepository.prototype.createServiceRequestWithAddress = function (ServiceRequest) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, index_1.db.ServiceRequest.create(ServiceRequest, { include: ['ServiceRequestAddress', 'ExtraService'] })];
            });
        });
    };
    BookServiceRepository.prototype.getBlockedHelper = function (userId, helperIds) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                return [2 /*return*/, index_1.db.FavoriteAndBlocked.findAll({ where: { UserId: userId, TargetUserId: (_a = {}, _a[sequelize_1.Op.or] = helperIds, _a), IsBlocked: true } })];
            });
        });
    };
    return BookServiceRepository;
}());
exports.BookServiceRepository = BookServiceRepository;
