import {Joi} from "celebrate"

export const ResetSchema = {
    addReset: {
        body: Joi.object({
            Email: Joi.string()
                    .required()
                    .email()
                    .example('abc@gmail.com')
                    .description('email of user'),
        })
    },
    addPassword: {
        body: Joi.object({
            resetLink: Joi.string()
                    .required()
                    .description('reset link'),
            newPassword: Joi.string()
                    .required()
                    .description('password of user'),
        })
    },
}