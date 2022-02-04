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
//     IsRegisteredUser: DataTypes.BOOLEAN,
//     ZipCode: DataTypes.STRING,
//     WorksWithPets: DataTypes.BOOLEAN,
//     LanguageId: DataTypes.INTEGER,
//     NationalityId: DataTypes.INTEGER,
//     ResetKey: DataTypes.STRING
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
        type: sequelize_1.DataTypes.STRING
    },
    LastName: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    Email: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
        unique: true
    },
    Password: {
        type: sequelize_1.DataTypes.STRING
    },
    Mobile: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
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
        type: sequelize_1.DataTypes.DATEONLY
    },
    IsRegisteredUser: {
        allowNull: false,
        type: sequelize_1.DataTypes.BOOLEAN
    },
    ZipCode: {
        type: sequelize_1.DataTypes.STRING
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
    ResetKey: {
        type: sequelize_1.DataTypes.STRING
    },
    createdAt: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE
    },
    updatedAt: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE
    }
};
