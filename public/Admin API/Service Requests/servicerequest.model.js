"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewServiceRequestSchema = void 0;
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
exports.NewServiceRequestSchema = {
    EditRescheduleSR: {
        body: celebrate_1.Joi.object({
            Addressline1: celebrate_1.Joi.string()
                .required()
                .example('Shaktivijay')
                .description('Street name'),
            Addressline2: celebrate_1.Joi.string()
                .required()
                .example('44')
                .description('House number'),
            City: celebrate_1.Joi.string()
                .required()
                .example('Surat')
                .description('City'),
            Notes: celebrate_1.Joi.string()
                .example('Comment')
                .description('Comment'),
            PostalCode: celebrate_1.Joi.string()
                .required()
                .example('395006')
                .description('Zip code'),
            RescheduleReason: celebrate_1.Joi.string()
                .example('Reason')
                .description('Reason'),
            ServiceRequestId: celebrate_1.Joi.number()
                .required()
                .example('4')
                .description('Service request id'),
            ServiceStartDate: celebrate_1.Joi.string()
                .required()
                .example('18/03/2022')
                .description('Date'),
            ServiceTime: celebrate_1.Joi.string()
                .required()
                .example('18:00')
                .description('Time'),
        })
    },
};
