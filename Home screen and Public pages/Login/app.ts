import express from "express";
import {sequelize} from "./models";
import router from "./routes";
import cors from "cors";
import  swaggerJSDoc from "swagger-jsdoc";
import  swaggerUI from "swagger-ui-express";
const corsOptions = {
    origin: `http://localhost:${process.env.PORT}`
  };


  
  
  
const app = express();
const swaggerOption={
    definition:{
        openapi:'3.0.0',
        info:{
            title:'Authentication API',
            version: '1.0.0',
            description:'Helperland Authentication API',
            contact:{
                name:'Helperland Team',
                email:'yashvantdesai7@gmail.com'
            },
            servers:[
                {
                url: "http://locslhost:3000"
                }
            ]
        }
    },
    apis:["routes.ts"]
}
const swaggerDocs = swaggerJSDoc(swaggerOption);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
require('dotenv').config();

app.use('/trainee2021',router);

app.listen(process.env.PORT, () => {
    console.log(`Server starting at ${process.env.PORT}`)
    sequelize.authenticate().then(async() => {
        console.log("database connected");

        try {
            await sequelize.sync();
        } catch (error) {
            console.log(error)
        }

    }).catch( (e: any) => {
        console.log(e.message)
    })
})