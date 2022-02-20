// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class ServiceRequestExtra extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   ServiceRequestExtra.init({
//     ServiceRequestId: DataTypes.INTEGER,
//     ServiceExtraId: DataTypes.INTEGER
//   }, {
//     sequelize,
//     modelName: 'ServiceRequestExtra',
//   });
//   return ServiceRequestExtra;
// };

import { Model, DataTypes, ModelAttributes } from 'sequelize';

export class SRExtra extends Model{

    ServiceRequestExtraId!: number;
    ServiceExtraId!: number;
}

export const SRExtraModelAttributes: ModelAttributes = {
    ServiceRequestExtraId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      ServiceExtraId: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
}