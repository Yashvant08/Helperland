import {Joi} from "celebrate"



export const LoginSchema = {
    addLogin: {
        body: Joi.object({
            Email: Joi.string()
                    .required()
                    .email()
                    .example('abc@gmail.com')
                    .description('email of user'),
            Password: Joi.string()
                .required()
                .description('password'),
        })
    },
}