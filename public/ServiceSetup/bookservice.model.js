"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookServiceSchema = void 0;
var celebrate_1 = require("celebrate");
var header = {
    authorization: celebrate_1.Joi.string()
        .required()
};
exports.BookServiceSchema = {
    zipcode: {
        body: celebrate_1.Joi.object({
            postalcode: celebrate_1.Joi.string()
                .required()
                .length(6)
                .example('395006')
                .description('ZipCode')
        })
    },
    userAddress: {
        body: celebrate_1.Joi.object({
            Addressline1: celebrate_1.Joi.string()
                .required()
                .example('New Shaktivijay')
                .description('Address'),
            Addressline2: celebrate_1.Joi.string()
                .example('44')
                .description('Address'),
            City: celebrate_1.Joi.string()
                .required()
                .example('Suart')
                .description('City'),
            State: celebrate_1.Joi.string()
                .example('Gujarat')
                .description('State'),
            IsDefault: celebrate_1.Joi.boolean()
                .required()
                .example('true'),
            IsDeleted: celebrate_1.Joi.boolean()
                .required()
                .example('true'),
            Mobile: celebrate_1.Joi.string()
                .example('7990604567')
                .description('User mobile number')
        })
    },
    createService: {
        body: celebrate_1.Joi.object({
            ServiceId: celebrate_1.Joi.number()
                .integer()
                .required()
                .example(1)
                .description('ServiceId'),
            ServiceStartDate: celebrate_1.Joi.string()
                .required()
                .example('10-02-2022')
                .description('Date'),
            ServiceStartTime: celebrate_1.Joi.string()
                .required()
                .example('09:00')
                .description('Time'),
            ServiceHours: celebrate_1.Joi.number()
                .integer()
                .required()
                .example('3')
                .description('Service Hours'),
            Comments: celebrate_1.Joi.string()
                .example('Hi')
                .description('comment'),
            PaymentDue: celebrate_1.Joi.boolean()
                .required()
                .example('true'),
            HasPets: celebrate_1.Joi.boolean()
                .required()
                .example('true')
                .description('Have pets at home'),
            // ServiceProviderId: Joi.number()
            //      .integer()   
            //      .example('1'),
            ServiceRequestAddress: celebrate_1.Joi.object()
                .required(),
            ExtraService: celebrate_1.Joi.array()
        })
    },
};
