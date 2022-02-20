"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubUserSchema = void 0;
var celebrate_1 = require("celebrate");
var params = {
    id: celebrate_1.Joi.number()
        .integer()
        .required()
        .description('Id of Subscriber')
};
exports.SubUserSchema = {
    getSubscriber: {
        params: params
    },
    addSubscriber: {
        body: celebrate_1.Joi.object({
            Email: celebrate_1.Joi.string()
                .email()
                .example('abc@gmail.com')
                .description('email of Subscriber')
        })
    }
};
