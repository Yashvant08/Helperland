"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteProsSchema = void 0;
var celebrate_1 = require("celebrate");
var header = {
    authorization: celebrate_1.Joi.string()
        .required()
};
exports.FavoriteProsSchema = {
    Favorite: {
        body: celebrate_1.Joi.object({
            IsFavorite: celebrate_1.Joi.boolean()
                .required()
                .example('true')
        })
    },
    Blocked: {
        body: celebrate_1.Joi.object({
            IsBlocked: celebrate_1.Joi.boolean()
                .required()
                .example('true')
        })
    }
};
