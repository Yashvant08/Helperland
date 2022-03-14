"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockCustomerSchema = void 0;
var celebrate_1 = require("celebrate");
var header = {
    authorization: celebrate_1.Joi.string()
        .required()
};
exports.BlockCustomerSchema = {
    Blocked: {
        body: celebrate_1.Joi.object({
            IsBlocked: celebrate_1.Joi.boolean()
                .required()
                .example('true')
        })
    }
};
