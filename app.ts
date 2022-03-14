import express from "express";
import {sequelize} from "./models";
import multer from "multer";
import  swaggerJSDoc from "swagger-jsdoc";
import  swaggerUI from "swagger-ui-express";
import bookservice from "./routes/bookservice";
import contactUs from "./routes/contactus";
import login from "./routes/login";
import customer from "./routes/customer";
import serviceProvider from "./routes/serviceprovider";
// import Yaml from "yamljs"


require('dotenv').config();

const app = express();
// const swaggerDc = Yaml.load('./apiList.yaml');
const swaggerOption={
    definition:{
        openapi:'3.0.0',
        info:{
            title:'Helperland API',
            version: '1.0.0',
            description:'Simple Helperland API',
            contact:{
                name:'Yashvantray Desai',
                email:'yashvantdesai7@gmail.com'
            },
            servers:[
                {
                url: "http://localhost:3000"
                }
            ]
        }
    },
    apis:["./routes/contactus.ts","./routes/login.ts","./routes/bookservice.ts", "./routes/customer.ts","./routes/serviceprovider.ts"]
}
const swaggerDocs = swaggerJSDoc(swaggerOption);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(multer({dest:'uploadFiles'}).single('file'));

app.use('/trainee2021/contact-us',contactUs);
app.use('/trainee2021/Login-User',login);
app.use('/trainee2021/bookservice',bookservice);
app.use('/trainee2021/customer',customer);
app.use('/trainee2021/serviceprovider',serviceProvider);

app.listen(process.env.PORT, () => {
    console.log(`Server starting at ${process.env.PORT}`)
    sequelize.authenticate().then(async() => {
        console.log("database connected");

        // try {
        //     await sequelize.sync();
        // } catch (error) {
        //     console.log(error)
        // }

    }).catch( (e: any) => {
        console.log(e.message)
    })
})