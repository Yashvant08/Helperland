"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
var celebrate_1 = require("celebrate");
var params = {
    ContactUsID: celebrate_1.Joi.number()
        .integer()
        .required()
        .description('Id of User')
};
exports.UserSchema = {
    get: {
        params: params
    },
    add: {
        body: celebrate_1.Joi.object({
            Name: celebrate_1.Joi.string()
                .required()
                .example('Yashvant')
                .description('Name of user'),
            Email: celebrate_1.Joi.string()
                .required()
                .email()
                .example('abc@gmail.com')
                .description('email of user'),
            SubjectType: celebrate_1.Joi.string()
                .required()
                .example('General')
                .description('Subject type'),
            PhoneNumber: celebrate_1.Joi.number()
                .required()
                .example('6756443451')
                .description('Phone Number of user'),
            Message: celebrate_1.Joi.string()
                .required()
                .example('xyz')
                .description('Message'),
            // UploadFileName: Joi.string(),
            // .example('abc.pdf')
            // .description('File'),
            // Status: Joi.number()
            //     .integer(),
            // .example('0')
            // .description('status'),
            IsDeleted: celebrate_1.Joi.number()
                .integer()
                .example('0')
                .description('isdeleted'),
        })
    },
};
