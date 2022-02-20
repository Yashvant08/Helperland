// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class SubUser extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   SubUser.init({
//     Email: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'SubUser',
//   });
//   return SubUser;
// };


import { Model, DataTypes, ModelAttributes } from 'sequelize';

export class SubUser extends Model {
  id!: number;
  
  Email!: string;

  IsConfirmedSub!:boolean;
  
  createdAt!: Date;
  
  updatedAt!: Date;
  
};

export const SubUserModelAttributes: ModelAttributes = {
  id: {
    autoIncrement: true,
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true
  },
  Email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  IsConfirmedSub: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false
  }
}