"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSchema = void 0;
var celebrate_1 = require("celebrate");
exports.LoginSchema = {
    addLogin: {
        body: celebrate_1.Joi.object({
            Email: celebrate_1.Joi.string()
                .required()
                .email()
                .example('abc@gmail.com')
                .description('email of user'),
            Password: celebrate_1.Joi.string()
                .required()
                .description('password'),
        })
    },
};
