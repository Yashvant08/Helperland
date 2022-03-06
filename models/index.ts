// 'use strict';

// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.json')[env];
// const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;


import { BuildOptions, Model, Sequelize } from 'sequelize';
import { ContactUs, ContactUsModelAttributes } from "./contactus";
import {SubUser, SubUserModelAttributes} from "./subuser";
import { User, UserModelAttributes } from "./user";
import {
  ServiceRequest,
  ServiceRequestModelAttributes,
} from "./servicerequest";
import { SRAddress, SRAddressModelAttributes } from "./servicerequestaddress";
import { SRExtra, SRExtraModelAttributes } from "./servicerequestextra";
import { UserAddress, UserAddressModelAttributes } from "./useraddress";
import { FavoriteAndBlocked, FAndBModelAttributes } from "./favoriteandblocked";
import { Rating, RatingModelAttributes } from './rating';

const env = process.env.NODE_ENV || 'development';

const config = require('../config/config')[env];

const  sequelize = config.url
  ? new Sequelize(config.url, config)
  : new Sequelize(config.database, config.username, config.password, config);

  export { Sequelize, sequelize };

  type ContactUsModelStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): ContactUs;
  };
  type SubUserModelStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): SubUser;
  };
  type UserModelStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): User;
  };
  
  type UserAddressModelStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): UserAddress;
  };
  
  type ServiceRequestModelStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): ServiceRequest;
  };
  
  type SRAddressModelStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): SRAddress;
  };
  
  type SRExtraModelStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): SRExtra;
  };
  
  type FAndBModelStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): FavoriteAndBlocked;
  };

  type RatingModelStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): Rating;
  };


  const UserDefineModel = sequelize.define(
    "User",
    {
      ...UserModelAttributes,
    },
    {
      tableName: "User",
    }
  ) as UserModelStatic;
  const UserAddressDefineModel = sequelize.define(
    "UserAddress",
    {
      ...UserAddressModelAttributes,
    },
    {
      tableName: "UserAddress",
    }
  ) as UserAddressModelStatic;
  
  const ServiceRequestDefineModel = sequelize.define(
    "ServiceRequest",
    {
      ...ServiceRequestModelAttributes,
    },
    {
      tableName: "ServiceRequest",
    }
  ) as ServiceRequestModelStatic;
  
  const SRAddressDefineModel = sequelize.define(
    "SRAddress",
    {
      ...SRAddressModelAttributes,
    },
    {
      tableName: "SRAddress",
    }
  ) as SRAddressModelStatic;
  
  const SRExtraDefineModel = sequelize.define(
    "SRExtra",
    {
      ...SRExtraModelAttributes,
    },
    {
      tableName: "SRExtra",
    }
  ) as SRExtraModelStatic;
  
  const FAndBDefineModel = sequelize.define(
    "FavoriteAndBlocked",
    {
      ...FAndBModelAttributes,
    },
    {
      tableName: "FavoriteAndBlocked",
    }
  ) as FAndBModelStatic;

  const ContactUsDefineModel = sequelize.define(
    'ContactUs',
    {
      ...ContactUsModelAttributes
    },
    {
      tableName: 'ContactUs'
    }
  ) as ContactUsModelStatic;

  const SubUserDefineModel = sequelize.define(
    'SubUser',
    {
      ...SubUserModelAttributes
    },
    {
      tableName: 'SubUser'
    }
  ) as SubUserModelStatic;

  const RatingDefineModel = sequelize.define(
    'Rating',
    {
      ...RatingModelAttributes
    },
    {
      tableName: 'Rating'
    }
  ) as RatingModelStatic;
  
  export interface DbContext {
    sequelize: Sequelize;
    ContactUs: ContactUsModelStatic;
    SubUser: SubUserModelStatic;
    User: UserModelStatic;
    UserAddress: UserAddressModelStatic;
    ServiceRequest: ServiceRequestModelStatic;
    SRAddress: SRAddressModelStatic;
    SRExtra: SRExtraModelStatic;
    FavoriteAndBlocked: FAndBModelStatic;
    Rating: RatingModelStatic;

  }
  
  export const db: DbContext = {
    sequelize: sequelize,
    ContactUs: ContactUsDefineModel,
    SubUser: SubUserDefineModel,
    User: UserDefineModel,
    ServiceRequest: ServiceRequestDefineModel,
    UserAddress: UserAddressDefineModel,
    SRExtra: SRExtraDefineModel,
    SRAddress: SRAddressDefineModel,
    FavoriteAndBlocked: FAndBDefineModel,
    Rating: RatingDefineModel
  }

  db.User.hasMany(db.UserAddress, {
    foreignKey: {
      name: "UserId",
      allowNull: false,
    },
    constraints: true,
    onDelete: "CASCADE",
  });
  db.UserAddress.belongsTo(db.User, {
    foreignKey: {
      name: "UserId",
      allowNull: false,
    },
    constraints: true,
    onDelete: "CASCADE",
  });

  
  db.ServiceRequest.hasOne(db.SRAddress, {
    foreignKey: {
      name: "ServiceRequestId",
      allowNull: false,
    },
    as:'ServiceRequestAddress',
    constraints: true,
    onDelete: "CASCADE",
  });
  db.SRAddress.belongsTo(db.ServiceRequest, {foreignKey: {
    name: "ServiceRequestId",
    allowNull: false,
  },
  constraints: true,
  onDelete: "CASCADE",
  });

  
  db.ServiceRequest.belongsTo(db.User,{
    foreignKey: {
      name: "UserId",
      allowNull: false,
    },
    as:'UserRequest',
    constraints: true,
    onDelete: "CASCADE",
  });
  db.User.hasMany(db.ServiceRequest,{
    foreignKey: {
      name: "UserId",
      allowNull: false,
    },
    as:'UserRequest',
    constraints: true,
    onDelete: "CASCADE",
  });


  db.ServiceRequest.belongsTo(db.User,{
    foreignKey: {
      name: "ServiceProviderId",
      allowNull: true,
    },
    as:'HelperRequest',
    constraints: true,
    onDelete: "CASCADE",
  });
  db.User.hasMany(db.ServiceRequest,{
    foreignKey: {
      name: "ServiceProviderId",
      allowNull: true,
    },
    as:'HelperRequest',
    constraints: true,
    onDelete: "CASCADE",
  });


  db.ServiceRequest.hasMany(db.SRExtra,{
    foreignKey: {
      name: "ServiceRequestId",
      allowNull: true,
    },
    as:'ExtraService',
    constraints: true,
    onDelete: "CASCADE",
  });
  

  db.User.hasMany(db.FavoriteAndBlocked,{
    foreignKey: {
      name: "UserId",
      allowNull: false,
    },
    as:'FavoriteAndBlocked',
    constraints: true,
    onDelete: "CASCADE",
  });
  db.User.hasMany(db.FavoriteAndBlocked,{
    foreignKey: {
      name: "TargetUserId",
      allowNull: false,
    },
    as:'TargetUserId',
    constraints: true,
    onDelete: "CASCADE",
  });


  db.ServiceRequest.hasOne(db.Rating, {
    foreignKey: {
      name: "ServiceRequestId",
      allowNull: false,
    },
    as:'ServiceRequestRating',
    constraints: true,
    onDelete: "CASCADE",
  });
  db.Rating.belongsTo(db.ServiceRequest, {
    foreignKey: {
    name: "ServiceRequestId",
    allowNull: false,
  },
  constraints: true,
  onDelete: "CASCADE",});


  db.User.hasMany(db.Rating, {
    foreignKey: {
    name: "RatingFrom",
    allowNull: false,
  },
  as:'RatingFrom',
  constraints: true,
  onDelete: "CASCADE",});  


  db.User.hasMany(db.Rating, {
    foreignKey: {
    name: "RatingTo",
    allowNull: false,
  },
  as:'RatingTo',
  constraints: true,
  onDelete: "CASCADE",});

  export default db;
  // export {ContactUsDefineModel};
  // export {SubUserDefineModel};
  // export{UserDefineModel}
  // export{ContactUsAttachmentDefineModel};