import {Joi} from "celebrate"

const header:Object = {
    authorization:  Joi.string()
                    .required()
};

export const FavoriteProsSchema = {
    Favorite: {
        body: Joi.object({
                IsFavorite: Joi.boolean()
                        .required()
                        .example('true')
        })
    },

    Blocked: {
        body: Joi.object({
                IsBlocked: Joi.boolean()
                        .required()
                        .example('true')
        })
    }
}

