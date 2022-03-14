"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceHistorySchema = void 0;
var celebrate_1 = require("celebrate");
var header = {
    authorization: celebrate_1.Joi.string()
        .required()
};
exports.ServiceHistorySchema = {};
