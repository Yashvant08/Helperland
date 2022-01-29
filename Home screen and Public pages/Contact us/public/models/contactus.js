"use strict";
// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class ContactUs extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   ContactUs.init({
//     Name: DataTypes.STRING,
//     email: DataTypes.STRING,
//     SubjectType: DataTypes.STRING,
//     Subject: DataTypes.STRING,
//     PhoneNumber: DataTypes.STRING,
//     Message: DataTypes.STRING,
//     UploadFileName: DataTypes.STRING,
//     CreatedBy: DataTypes.INTEGER,
//     Status: DataTypes.INTEGER,
//     Priority: DataTypes.INTEGER,
//     AssignedToUser: DataTypes.INTEGER,
//     IsDeleted: DataTypes.INTEGER
//   }, {
//     sequelize,
//     modelName: 'ContactUs',
//   });
//   return ContactUs;
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
exports.ContactUsModelAttributes = exports.ContactUs = void 0;
var sequelize_1 = require("sequelize");
var ContactUs = /** @class */ (function (_super) {
    __extends(ContactUs, _super);
    function ContactUs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ContactUs.associate = function (models) {
        //define association here
    };
    return ContactUs;
}(sequelize_1.Model));
exports.ContactUs = ContactUs;
;
exports.ContactUsModelAttributes = {
    ContactUsId: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
    },
    Name: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    Email: {
        allowNull: false,
        unique: true,
        type: sequelize_1.DataTypes.STRING
    },
    SubjectType: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    Subject: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING
    },
    PhoneNumber: {
        allowNull: false,
        type: sequelize_1.DataTypes.BIGINT
    },
    Message: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    UploadFileName: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING
    },
    FilePath: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING
    },
    CreatedBy: {
        allowNull: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    Status: {
        allowNull: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    Priority: {
        allowNull: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    AssignedToUser: {
        allowNull: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    IsDeleted: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
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
