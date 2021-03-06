"use strict";
// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class ServiceRequestAddress extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   ServiceRequestAddress.init({
//     ServiceRequestId: DataTypes.INTEGER,
//     Addressline1: DataTypes.STRING,
//     Addressline2: DataTypes.STRING,
//     City: DataTypes.STRING,
//     State: DataTypes.STRING,
//     PostalCode: DataTypes.STRING,
//     Mobile: DataTypes.STRING,
//     Email: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'ServiceRequestAddress',
//   });
//   return ServiceRequestAddress;
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
exports.SRAddressModelAttributes = exports.SRAddress = void 0;
var sequelize_1 = require("sequelize");
var SRAddress = /** @class */ (function (_super) {
    __extends(SRAddress, _super);
    function SRAddress() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SRAddress;
}(sequelize_1.Model));
exports.SRAddress = SRAddress;
exports.SRAddressModelAttributes = {
    Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    Addressline1: {
        type: sequelize_1.DataTypes.STRING(200)
    },
    Addressline2: {
        type: sequelize_1.DataTypes.STRING(200)
    },
    City: {
        type: sequelize_1.DataTypes.STRING(50)
    },
    State: {
        type: sequelize_1.DataTypes.STRING(50)
    },
    PostalCode: {
        type: sequelize_1.DataTypes.STRING(20)
    },
    Mobile: {
        type: sequelize_1.DataTypes.STRING(20)
    },
    Email: {
        type: sequelize_1.DataTypes.STRING(100)
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
