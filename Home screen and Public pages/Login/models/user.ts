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


import { Model, DataTypes, ModelAttributes } from 'sequelize';

export class User extends Model{
    UserId!:number;

    FirstName?:string;

    LastName?:string;

    Email?:string;

    Password?:string;

    Mobile?:string;

    UserTypeId!:number;

    Gender!:number;

    DateOfBirth!:Date;

    IsRegisteredUser!:boolean;

    ZipCode?:string;

    WorksWithPets!:boolean;

    LanguageId!:number;

    NationalityId!:number;

    ResetKey?:string
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
        allowNull: false,
        type: DataTypes.INTEGER
      },
      Gender: {
        type: DataTypes.INTEGER
      },
      DateOfBirth: {
        type: DataTypes.DATEONLY
      },
      IsRegisteredUser: {
        allowNull: false,
        type: DataTypes.BOOLEAN
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
      ResetKey: {
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