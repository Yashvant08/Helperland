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

import { Model, DataTypes, ModelAttributes } from 'sequelize';

export class SRAddress extends Model{

    Id!:number;
    // ServiceRequestId!: number;
    Addressline1!: string;
    Addressline2!: string;
    City!: string;
    State!: string;
    PostalCode!: string;
    Mobile!: string;
    Email!: string;
}

export const SRAddressModelAttributes:ModelAttributes = {
    Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      Addressline1: {
        type: DataTypes.STRING(200)
      },
      Addressline2: {
        type: DataTypes.STRING(200)
      },
      City: {
        type: DataTypes.STRING(50)
      },
      State: {
        type: DataTypes.STRING(50)
      },
      PostalCode: {
        type: DataTypes.STRING(20)
      },
      Mobile: {
        type: DataTypes.STRING(20)
      },
      Email: {
        type: DataTypes.STRING(100)
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