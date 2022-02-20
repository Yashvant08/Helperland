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

import { Mode } from 'fs';
import { Model, DataTypes, ModelAttributes } from 'sequelize';
import { UserAddress } from './useraddress';

export class User extends Model {
  UserId!: number;

  FirstName?: string;

  LastName?: string;

  Email?: string;

  Password?: string;

  Mobile?: string;

  UserTypeId!: number;

  Gender!: number;

  DateOfBirth!: Date;

  UserProfilePicture!: string;

  IsRegisteredUser!: boolean;

  PaymentGatewayUserRef!: string;

  ZipCode?: string;

  WorksWithPets!: boolean;

  LanguageId!: number;

  NationalityId!: number;

  ModifiedBy!: number;

  IsApproved!: boolean;

  IsActive!: boolean;

  IsDeleted!: boolean;

  Status!: number;

  BankTokenId!: string;

  Taxno!: string;

  // static associate(models:any) {
  //   User.belongsToMany(models.UserAddress, {
  //     through:'UserCombine'
  //   });
  // }
}

export const UserModelAttributes:ModelAttributes = {
    UserId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      FirstName: {
        allowNull: false,
        type: DataTypes.STRING
      },
      LastName: {
        allowNull: false,
        type: DataTypes.STRING
      },
      Email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique:true
      },
      Password: {
        type: DataTypes.STRING
      },
      Mobile: {
        allowNull: false,
        type: DataTypes.STRING,
        unique:true
      },
      UserTypeId: {
        // allowNull: false,
        type: DataTypes.INTEGER
      },
      Gender: {
        type: DataTypes.INTEGER
      },
      DateOfBirth: {
        type: DataTypes.DATEONLY
      },
      UserProfilePicture: {
        type: DataTypes.STRING
      },
      IsRegisteredUser: {
        // allowNull: false,
        type: DataTypes.BOOLEAN
      },
      PaymentGatewayUserRef: {
        type: DataTypes.STRING
      },
      ZipCode: {
        type: DataTypes.STRING
      },
      WorksWithPets: {
        type: DataTypes.BOOLEAN
      },
      LanguageId: {
        type: DataTypes.INTEGER
      },
      NationalityId: {
        type: DataTypes.INTEGER
      },
      ModifiedBy: {
        // allowNull: false,
        type: DataTypes.INTEGER
      },
      IsApproved: {
        // allowNull: false,
        type: DataTypes.BOOLEAN
      },
      IsActive: {
        // allowNull: false,
        type: DataTypes.BOOLEAN
      },
      IsDeleted: {
        // allowNull: false,
        type: DataTypes.BOOLEAN
      },
      Status: {
        type: DataTypes.INTEGER
      },
      BankTokenId: {
        type: DataTypes.STRING
      },
      Taxno: {
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
}

