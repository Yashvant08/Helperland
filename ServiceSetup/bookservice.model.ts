import {Joi} from "celebrate"
import { join } from "path/posix";

const header:Object = {
    authorization:  Joi.string()
                    .required()
};

export const BookServiceSchema = {
    zipcode: {
        body: Joi.object({
            postalcode: Joi.string()
                    .required()
                    .length(6)
                    .example('395006')
                    .description('ZipCode')
        })
    },
    userAddress: {
        body: Joi.object({
                Addressline1: Joi.string()
                        .required()
                        .example('New Shaktivijay')
                        .description('Address'),
                Addressline2: Joi.string()
                        .example('44')
                        .description('Address'),
                City: Joi.string()
                        .required()
                        .example('Suart')
                        .description('City'),
                State: Joi.string()
                        .example('Gujarat')
                        .description('State'),
                IsDefault: Joi.boolean()
                        .required()
                        .example('true'),
                IsDeleted: Joi.boolean()
                        .required()
                        .example('true'),
                Mobile: Joi.string()
                        .example('7990604567')
                        .description('User mobile number')
           
        })
    },
    createService: {
        body: Joi.object({
                ServiceId: Joi.number()
                        .integer()
                        .required()
                        .example(1)
                        .description('ServiceId'),
                ServiceStartDate: Joi.date()
                        .required()
                        .example('10-02-2022')
                        .description('Date'),
                ServiceStartTime: Joi.string()
                        .required()
                        .example('09:00')
                        .description('Time'),
                ServiceHours: Joi.number()
                        .integer()
                        .required()
                        .example('3')
                        .description('Service Hours'),
                Comments: Joi.string()
                        .example('Hi')
                        .description('comment'),
                PaymentDue: Joi.boolean()
                        .required()
                        .example('true'),
                HasPets: Joi.boolean()
                        .required()
                        .example('true')
                        .description('Have pets at home'),
                // ServiceProviderId: Joi.number()
                //      .integer()   
                //      .example('1'),
                ServiceRequestAddress: Joi.object()
                        .required(),
                ExtraService: Joi.array()
        })
    },
}

