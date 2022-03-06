"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySettingsSchema = void 0;
var celebrate_1 = require("celebrate");
var header = {
    authorization: celebrate_1.Joi.string()
        .required()
};
exports.MySettingsSchema = {
    UpdateUser: {
        body: celebrate_1.Joi.object({
            FirstName: celebrate_1.Joi.string()
                .required()
                .example('Yashvant')
                .description('FirstName of user'),
            LastName: celebrate_1.Joi.string()
                .required()
                .example('Yashvant')
                .description('LastName of user'),
            Mobile: celebrate_1.Joi.string()
                .length(10)
                .required()
                .example('6756443451')
                .description('Phone Number of user'),
            DateOfBirth: celebrate_1.Joi.string()
                .required()
                .example('30-10-2000')
                .description('birth date of user'),
            LanguageId: celebrate_1.Joi.number()
                .integer()
                .required()
                .example(1)
                .description('language comfartable with')
        })
    },
    UpdateCreateUserAddress: {
        body: celebrate_1.Joi.object({
            StreetName: celebrate_1.Joi.string()
                .required()
                .example('Yashvant')
                .description('FirstName of user'),
            HouseNumber: celebrate_1.Joi.string()
                .required()
                .example('Yashvant')
                .description('LastName of user'),
            PostalCode: celebrate_1.Joi.string()
                .required()
                .example('395006')
                .description('Zip code'),
            City: celebrate_1.Joi.string()
                .required()
                .example('Suart')
                .description('City'),
            Mobile: celebrate_1.Joi.string()
                .required()
                .length(10)
                .example('6756443451')
                .description('Phone Number of user'),
        })
    },
    ChangePassword: {
        body: celebrate_1.Joi.object({
            OldPassword: celebrate_1.Joi.string()
                .required()
                .example('36900360')
                .description('password'),
            NewPassword: celebrate_1.Joi.string()
                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
                .required()
                .example('Ya36900369')
                .description('password'),
            ConfirmPassword: celebrate_1.Joi.string()
                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
                .required()
                .example('Ya36900369')
                .description('password')
        })
    },
};
