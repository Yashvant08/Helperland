"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactUsSchema = void 0;
var celebrate_1 = require("celebrate");
var params = {
    ContactUsID: celebrate_1.Joi.number()
        .integer()
        .required()
        .description('Id of User')
};
exports.ContactUsSchema = {
    get: {
        params: params
    },
    add: {
        body: celebrate_1.Joi.object({
            FirstName: celebrate_1.Joi.string()
                .required()
                .example('Yashvant')
                .description('First Name of user'),
            LastName: celebrate_1.Joi.string()
                .required()
                .example('desai')
                .description('Last Name of user'),
            Email: celebrate_1.Joi.string()
                .required()
                .email()
                .example('abc@gmail.com')
                .description('email of user'),
            Subject: celebrate_1.Joi.string()
                .required()
                .example('General')
                .description('Subject type'),
            PhoneNumber: celebrate_1.Joi.string()
                .length(10)
                .required()
                .example('6756443451')
                .description('Phone Number of user'),
            Message: celebrate_1.Joi.string()
                .required()
                .example('xyz')
                .description('Message'),
        })
    },
};
