"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelperSchema = void 0;
var celebrate_1 = require("celebrate");
var params = {
    UserId: celebrate_1.Joi.number()
        .integer()
        .required()
        .description('Id of User')
};
exports.HelperSchema = {
    get: {
        params: params
    },
    validate: {
        body: celebrate_1.Joi.object({
            FirstName: celebrate_1.Joi.string()
                .required()
                .example('Yashvant')
                .description('FirstName of helper'),
            LastName: celebrate_1.Joi.string()
                .required()
                .example('Yashvant')
                .description('LastName of helper'),
            Email: celebrate_1.Joi.string()
                .required()
                .email()
                .example('abc@gmail.com')
                .description('email of helper'),
            Password: celebrate_1.Joi.string()
                .required()
                .description('password'),
            ConfirmPassword: celebrate_1.Joi.string()
                .required()
                .description('confirmPassword'),
            Mobile: celebrate_1.Joi.string()
                .required()
                .example('6756443451')
                .description('Phone Number of helper'),
        })
    },
};
