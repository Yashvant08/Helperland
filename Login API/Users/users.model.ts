import {Joi} from "celebrate"

const params:Object = {
    UserId: Joi.number()
            .integer()
            .required()
            .description('Id of User')
};

export const UserSchema = {
    get: {
        params: params
    },
    add: {
        body: Joi.object({
            FirstName: Joi.string()
                .required()
                .example('Yashvant')
                .description('FirstName of user'),
            LastName: Joi.string()
                .required()
                .example('Yashvant')
                .description('LastName of user'),
            Email: Joi.string()
                    .required()
                    .email()
                    .example('abc@gmail.com')
                    .description('email of user'),
            Password: Joi.string()
                .required()
                .description('password'),
            ConfirmPassword: Joi.string()
                .required()
                .description('confirmPassword'),
            Mobile: Joi.string()
                .required()
                .example('6756443451')
                .description('Phone Number of user'),
            ZipCode: Joi.string()
                .required()
                .example('395006')
                .description('Zip code'),
            
        })
    },
}