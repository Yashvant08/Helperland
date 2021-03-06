// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class UserAddress extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   UserAddress.init({
//     UserId: DataTypes.INTEGER,
//     Addressline1: DataTypes.STRING,
//     Addressline2: DataTypes.STRING,
//     City: DataTypes.STRING,
//     State: DataTypes.STRING,
//     PostalCode: DataTypes.STRING,
//     IsDefault: DataTypes.BOOLEAN,
//     IsDeleted: DataTypes.BOOLEAN,
//     Email: DataTypes.STRING,
//     Mobile: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'UserAddress',
//   });
//   return UserAddress;
// };

import { Model, DataTypes, ModelAttributes } from 'sequelize';
import { User } from './user';

export class UserAddress extends Model{

    AddressId!:number;

    // UserId!: number;

    Addressline1!: string ;

    Addressline2!: string;

    City!: string;

    State!: string;

    PostalCode!: string;

    IsDefault!: boolean;

    IsDeleted!: boolean;

    Email!: string;

    Mobile!: string;

    UserId!: number;

    // static associate(models:any) {
    //   UserAddress.belongsToMany(models.User, {
    //     through:'UserCombine'
    //   });
    // }
}

export const UserAddressModelAttributes:ModelAttributes = {
    AddressId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      Addressline1: {
        allowNull: false,
        type: DataTypes.STRING(200)
      },
      Addressline2: {
        type: DataTypes.STRING(200)
      },
      City: {
        allowNull: false,
        type: DataTypes.STRING(50)
      },
      State: {
        type: DataTypes.STRING(50)
      },
      PostalCode: {
        allowNull: false,
        type: DataTypes.STRING(20)
      },
      IsDefault: {
        allowNull: false,
        type: DataTypes.BOOLEAN
      },
      IsDeleted: {
        allowNull: false,
        type: DataTypes.BOOLEAN
      },
      Mobile: {
        type: DataTypes.STRING(20)
      },
      Email: {
        type: DataTypes.STRING
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
