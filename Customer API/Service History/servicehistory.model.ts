import {Joi} from "celebrate"


const header:Object = {
    authorization:  Joi.string()
                    .required()
};

export const ServiceHistorySchema = {
    
    Ratings: {
        body: Joi.object({
                Comments: Joi.string()
                        .example('Hi')
                        .description('comment'),
                OnTimeArrival: Joi.number()
                        .example('3'),
                Friendly: Joi.number()
                        .example('3'),
                QualityOfService: Joi.number()
                        .example('3'),
        })
    },
}

