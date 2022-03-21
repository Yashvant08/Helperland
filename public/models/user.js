"use strict";
// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class User extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   User.init({
//     FirstName: DataTypes.STRING,
//     LastName: DataTypes.STRING,
//     Email: DataTypes.STRING,
//     Password: DataTypes.STRING,
//     Mobile: DataTypes.STRING,
//     UserTypeId: DataTypes.INTEGER,
//     Gender: DataTypes.INTEGER,
//     DateOfBirth: DataTypes.STRING,
//     UserProfilePicture: DataTypes.STRING,
//     IsRegisteredUser: DataTypes.BOOLEAN,
//     PaymentGatewayUserRef: DataTypes.STRING,
//     ZipCode: DataTypes.STRING,
//     WorksWithPets: DataTypes.BOOLEAN,
//     LanguageId: DataTypes.INTEGER,
//     NationalityId: DataTypes.INTEGER,
//     ResetKey: DataTypes.STRING,
//     CreatedDate: DataTypes.DATEONLY,
//     ModifiedDate: DataTypes.DATEONLY,
//     ModifiedBy: DataTypes.INTEGER,
//     IsApproved: DataTypes.BOOLEAN,
//     IsActive: DataTypes.BOOLEAN,
//     IsDeleted: DataTypes.BOOLEAN,
//     Status: DataTypes.INTEGER,
//     BankTokenId: DataTypes.STRING,
//     Taxno: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'User',
//   });
//   return User;
// };
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModelAttributes = exports.User = void 0;
var sequelize_1 = require("sequelize");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return User;
}(sequelize_1.Model));
exports.User = User;
exports.UserModelAttributes = {
    UserId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    FirstName: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(100)
    },
    LastName: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(100)
    },
    Email: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(100),
        unique: true
    },
    Password: {
        type: sequelize_1.DataTypes.STRING(100)
    },
    Mobile: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(20),
        unique: true
    },
    UserTypeId: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    },
    Gender: {
        type: sequelize_1.DataTypes.INTEGER
    },
    DateOfBirth: {
        type: sequelize_1.DataTypes.DATE
    },
    UserProfilePicture: {
        type: sequelize_1.DataTypes.STRING(200)
    },
    IsRegisteredUser: {
        allowNull: false,
        type: sequelize_1.DataTypes.BOOLEAN
    },
    PaymentGatewayUserRef: {
        type: sequelize_1.DataTypes.STRING(200)
    },
    ZipCode: {
        type: sequelize_1.DataTypes.STRING(20)
    },
    WorksWithPets: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    LanguageId: {
        type: sequelize_1.DataTypes.INTEGER
    },
    NationalityId: {
        type: sequelize_1.DataTypes.INTEGER
    },
    ModifiedBy: {
        type: sequelize_1.DataTypes.INTEGER
    },
    IsApproved: {
        // allowNull: false,
        type: sequelize_1.DataTypes.BOOLEAN
    },
    IsActive: {
        allowNull: false,
        type: sequelize_1.DataTypes.BOOLEAN
    },
    IsDeleted: {
        // allowNull: false,
        type: sequelize_1.DataTypes.BOOLEAN
    },
    Status: {
        type: sequelize_1.DataTypes.INTEGER
    },
    BankTokenId: {
        type: sequelize_1.DataTypes.STRING
    },
    Taxno: {
        type: sequelize_1.DataTypes.STRING
    },
    createdAt: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE
    },
    updatedAt: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE
    },
};
