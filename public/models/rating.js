"use strict";
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
exports.RatingModelAttributes = exports.Rating = void 0;
// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Rating extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Rating.init({
//     ServiceRequestId: DataTypes.INTEGER,
//     RatingFrom: DataTypes.INTEGER,
//     RatingTo: DataTypes.INTEGER,
//     Ratings: DataTypes.DECIMAL,
//     Comments: DataTypes.STRING,
//     RatingDate: DataTypes.DATE,
//     OnTimeArrival: DataTypes.DECIMAL,
//     Friendly: DataTypes.DECIMAL,
//     QualityOfService: DataTypes.DECIMAL
//   }, {
//     sequelize,
//     modelName: 'Rating',
//   });
//   return Rating;
// };
var sequelize_1 = require("sequelize");
var Rating = /** @class */ (function (_super) {
    __extends(Rating, _super);
    function Rating() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Rating;
}(sequelize_1.Model));
exports.Rating = Rating;
exports.RatingModelAttributes = {
    RatingId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    Ratings: {
        allowNull: false,
        type: sequelize_1.DataTypes.DECIMAL(2, 1)
    },
    Comments: {
        type: sequelize_1.DataTypes.STRING(2000)
    },
    RatingDate: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE
    },
    OnTimeArrival: {
        allowNull: false,
        type: sequelize_1.DataTypes.DECIMAL(2, 1)
    },
    Friendly: {
        allowNull: false,
        type: sequelize_1.DataTypes.DECIMAL(2, 1)
    },
    QualityOfService: {
        allowNull: false,
        type: sequelize_1.DataTypes.DECIMAL(2, 1)
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
