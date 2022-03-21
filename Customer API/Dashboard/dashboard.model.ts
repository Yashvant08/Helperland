import {Joi} from "celebrate"

const header:Object = {
    authorization:  Joi.string()
                    .required()
};

const params1: object = {
        id: Joi.number()
            .integer()
            .required()
            .description('Id of User')
    };

export const DashboardSchema = {

        GetDashboard: {
                params:params1
        },

        RescheduleSR: {
                body: Joi.object({
                        date:Joi.string()
                                .required()
                                .example('25-02-2022')
                                .description('date'),
                        time:Joi.string()
                                .required()
                                .example('16:30')
                                .description('time')
                        
                })
        },

        CancelSR: {
                body: Joi.object({
                        comment:Joi.string()
                                .example('about helperland')
                                .description('comment')
                        
                })
        },
}

