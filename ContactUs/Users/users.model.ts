import {Joi} from "celebrate"

const params:Object = {
    ContactUsID: Joi.number()
            .integer()
            .required()
            .description('Id of User')
};

export const ContactUsSchema = {
    get: {
        params: params
    },
    add: {
        body: Joi.object({
            FirstName: Joi.string()
                .required()
                .example('Yashvant')
                .description('First Name of user'),
            LastName: Joi.string()
                .required()
                .example('desai')
                .description('Last Name of user'),
            Email: Joi.string()
                    .required()
                    .email()
                    .example('abc@gmail.com')
                    .description('email of user'),
            Subject: Joi.string()
                .required()
                .example('General')
                .description('Subject type'),
            PhoneNumber: Joi.string()
                .length(10)
                .required()
                .example('6756443451')
                .description('Phone Number of user'),
            Message: Joi.string()
                .required()
                .example('xyz')
                .description('Message'),
        })
    },
}