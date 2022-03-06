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

import { Model, DataTypes, ModelAttributes } from 'sequelize';

export class ContactUs extends Model{

    ContactUsId!: number;

    Name?:string;

    Email?: string;

    Subject?: string;

    PhoneNumber?: string;

    Message?: string;

    UploadFileName?: string;

    FilePath?: string;

    CreatedBy!: number;

    createdAt!: Date;

    updatedAt!: Date;
    static associate(models: any) {
      //define association here
          }
};


export const ContactUsModelAttributes: ModelAttributes = {
    ContactUsId: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      Name: {
        allowNull: false,
        type: DataTypes.STRING(50)
      },
      Email: {
        allowNull: false,
        unique:true,
        type: DataTypes.STRING(200)
      },
      Subject: {
        allowNull: true,
        type: DataTypes.STRING(500)
      },
      PhoneNumber: {
        allowNull: false,
        type: DataTypes.STRING(20)
      },
      Message: {
        allowNull: false,
        type: DataTypes.STRING
      },
      UploadFileName: {
        allowNull: true,
        type: DataTypes.STRING(100)
      },
      FilePath: {
        allowNull: true,
        type:DataTypes.STRING(500)
      },
      CreatedBy: {
        allowNull: true,
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


