import express from "express";
import { celebrate } from 'celebrate';
import { UsersRepository } from "../ContactUs/Users/users.repository";
import { ContactUsSchema } from "../ContactUs/Users/users.model";
import { UsersController } from "../ContactUs/Users/users.controller";
import {UsersService} from "../ContactUs/Users/users.service";
import { SubUserRepository } from "../ContactUs/NewsLetter/subuser.repository";
import { SubUserService } from "../ContactUs/NewsLetter/subuser.service";
import { SubUserController } from "../ContactUs/NewsLetter/subuser.controller";
import { SubUserSchema } from "../ContactUs/NewsLetter/subuser.model";


const {add} = ContactUsSchema;
const {addSubscriber, getSubscriber} = SubUserSchema;

const router: express.Router = express.Router();


const repo: UsersRepository = new UsersRepository();
const service: UsersService= new UsersService(repo);
const controller: UsersController = new UsersController(service);

const subUserRepo:SubUserRepository = new SubUserRepository();
const subUserService:SubUserService = new SubUserService(subUserRepo);
const subUserController:SubUserController = new SubUserController(subUserService);

/**
 *@swagger
 * definitions:
 *  ContactUs:
 *   type: object
 *   properties:
 *    FirstName:
 *     type: string
 *     description: first name of the user
 *     example: 'Yashvantray'
 *    LastName:
 *     type: string
 *     description: last name of the user
 *     example: 'Desai'
 *    Email:
 *     type: string
 *     description: email of the user
 *     example: 'yashvantdesai7@gmail.com'
 *    SubjectType:
 *     type: string
 *     description: type of object
 *     example: 'inquary'
 *    PhoneNumber:
 *     type: integer
 *     description: phone number
 *     example: '7990602480'
 *    Message:
 *     type: string
 *     description: designation of the employee
 *     example: 'about helperland'
 *    file:
 *     type: file
 *     description: The file to upload
 *    IsDeleted:
 *     type: integer
 *     description: deleted 
 *     example: 1
 *  SendEmail:
 *   type: object
 *   properties:
 *    Email:
 *     type: string
 *     description: email
 *     example: 'yashvantdesai7@gmail.com'
 */

//ContectUs routes

/**
 * @swagger
 * /createContact:
 *  post:
 *   summary: create user
 *   description: create user for contact
 *   requestBody:
 *    content:
 *     multipart/form-data:
 *      schema:
 *       $ref: '#/definitions/ContactUs'
 *   responses:
 *    200:
 *     description: user created succesfully
 *    500:
 *     description: failure in creating user
 */
router.post('/createContact', controller.authenticate,controller.createUsers);

/**
 * @swagger
 * /contactus:
 *  get:
 *   summary: get all users
 *   description: get all users
 *   responses:
 *    200:
 *     description: success
 *    500:
 *     description: error
 */
router.get('/getContact',controller.getUsers);

/**
 * @swagger
 *  /contactus/{id}:
 *   get:
 *    summary: get user by id
 *    description: get user by id
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: integer
 *       required: true
 *       description: id of the user
 *       example: 2
 *    responses:
 *     200:
 *      description: success
 *     500:
 *      description: error
 */
router.get('/getContact/:id',controller.getUserById);
// router.delete('/contactus/:id',controller.deleteUsers);
// router.put('/contactus/:id',controller.updateUsers);



// NewsLetter Routes

// create subscriber

/**
 * @swagger
 * /newsletter/sb-user:
 *  post:
 *   summary: Subscribe to NewsLetter
 *   description: Enter email
 *   requestBody:
 *    content:
 *     multipart/form-data:
 *      schema:
 *       $ref: '#/definitions/SendEmail'
 *   responses:
 *    200:
 *     description: Confirmation link has been sent to you Email ID
 *    400:
 *     description: You can subscribe only one time
 *    500:
 *     description: something went wrong
 */
router.post('/newsletter/sb-user', celebrate(addSubscriber),subUserController.createSubUser);
// confirm user email for send news letter
router.get('/sb-User/activate/:token', subUserController.subConfirmation);
// send email to all
router.get('/sb-User/send-email', subUserController.sendEmailToAll);
// get all subscriber
router.get('/newsletter/sb-user',subUserController.getAllSubUsers);
// get subscriber by id
router.get('/newsletter/sb-user/:id', celebrate(getSubscriber),subUserController.getSubUserById);




export = router;