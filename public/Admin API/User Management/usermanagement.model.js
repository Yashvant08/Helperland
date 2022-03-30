"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManagementSchema = void 0;
var celebrate_1 = require("celebrate");
var header = {
    authorization: celebrate_1.Joi.string()
        .required()
};
exports.UserManagementSchema = {
    RefundAmount: {
        body: celebrate_1.Joi.object({
            ServiceRequestId: celebrate_1.Joi.number()
                .required()
                .example('4')
                .description('Service request id'),
            PaidAmount: celebrate_1.Joi.number()
                .required()
                .example('4')
                .description('amount'),
            RefundedAmount: celebrate_1.Joi.number()
                .required()
                .example('4')
                .description('amount'),
            Comment: celebrate_1.Joi.string()
                .example('comments')
                .description('Comments'),
            Notes: celebrate_1.Joi.string()
                .example('notes')
                .description('Notes'),
            // Percentage:Joi.number()
            //             .required()
            //             .example('10')
            //             .description('percentage'),
        })
    },
};
// "Comment":"",
// "Notes":""
