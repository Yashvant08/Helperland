"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
var celebrate_1 = require("celebrate");
var params = {
    UserId: celebrate_1.Joi.number()
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
            FirstName: celebrate_1.Joi.string()
                .required()
                .example('Yashvant')
                .description('FirstName of user'),
            LastName: celebrate_1.Joi.string()
                .required()
                .example('Yashvant')
                .description('LastName of user'),
            Email: celebrate_1.Joi.string()
                .required()
                .email()
                .example('abc@gmail.com')
                .description('email of user'),
            Password: celebrate_1.Joi.string()
                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
                .required()
                .description('password'),
            ConfirmPassword: celebrate_1.Joi.string()
                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
                .required()
                .description('confirmPassword'),
            Mobile: celebrate_1.Joi.string()
                .required()
                .example('6756443451')
                .description('Phone Number of user'),
            // ZipCode: Joi.string()
            //     .required()
            //     .example('395006')
            //     .description('Zip code'),
        })
    },
};
