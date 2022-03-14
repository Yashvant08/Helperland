"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardSchema = void 0;
var celebrate_1 = require("celebrate");
var header = {
    authorization: celebrate_1.Joi.string()
        .required()
};
var params1 = {
    id: celebrate_1.Joi.number()
        .integer()
        .required()
        .description('Id of User')
};
exports.DashboardSchema = {};
