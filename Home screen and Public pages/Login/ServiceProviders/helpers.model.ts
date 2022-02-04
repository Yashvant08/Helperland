import {Joi} from "celebrate"

const params:Object = {
    UserId: Joi.number()
            .integer()
            .required()
            .description('Id of User')
};

export const HelperSchema = {
    get: {
        params: params
    },
    validate: {
        body: Joi.object({
            FirstName: Joi.string()
                .required()
                .example('Yashvant')
                .description('FirstName of helper'),
            LastName: Joi.string()
                .required()
                .example('Yashvant')
                .description('LastName of helper'),
            Email: Joi.string()
                    .required()
                    .email()
                    .example('abc@gmail.com')
                    .description('email of helper'),
            Password: Joi.string()
                .required()
                .description('password'),
            ConfirmPassword: Joi.string()
                .required()
                .description('confirmPassword'),
            Mobile: Joi.string()
                .required()
                .example('6756443451')
                .description('Phone Number of helper'),
            
        })
    },
}