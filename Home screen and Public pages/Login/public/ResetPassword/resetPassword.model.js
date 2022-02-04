"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetSchema = void 0;
var celebrate_1 = require("celebrate");
exports.ResetSchema = {
    addReset: {
        body: celebrate_1.Joi.object({
            Email: celebrate_1.Joi.string()
                .required()
                .email()
                .example('abc@gmail.com')
                .description('email of user'),
        })
    },
    addPassword: {
        body: celebrate_1.Joi.object({
            resetLink: celebrate_1.Joi.string()
                .required()
                .description('reset link'),
            newPassword: celebrate_1.Joi.string()
                .required()
                .description('password of user'),
        })
    },
};
