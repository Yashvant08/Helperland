"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var celebrate_1 = require("celebrate");
var users_repository_1 = require("../ContactUs/Users/users.repository");
var users_model_1 = require("../ContactUs/Users/users.model");
var users_controller_1 = require("../ContactUs/Users/users.controller");
var users_service_1 = require("../ContactUs/Users/users.service");
var subuser_repository_1 = require("../ContactUs/NewsLetter/subuser.repository");
var subuser_service_1 = require("../ContactUs/NewsLetter/subuser.service");
var subuser_controller_1 = require("../ContactUs/NewsLetter/subuser.controller");
var subuser_model_1 = require("../ContactUs/NewsLetter/subuser.model");
var add = users_model_1.ContactUsSchema.add;
var addSubscriber = subuser_model_1.SubUserSchema.addSubscriber, getSubscriber = subuser_model_1.SubUserSchema.getSubscriber;
var router = express_1.default.Router();
var repo = new users_repository_1.UsersRepository();
var service = new users_service_1.UsersService(repo);
var controller = new users_controller_1.UsersController(service);
var subUserRepo = new subuser_repository_1.SubUserRepository();
var subUserService = new subuser_service_1.SubUserService(subUserRepo);
var subUserController = new subuser_controller_1.SubUserController(subUserService);
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
 * /trainee2021/contact-us/createContact:
 *  post:
 *   summary: create user
 *   description: create user for contact
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
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
router.post('/createContact', controller.authenticate, controller.createUsers);
/**
 * @swagger
 * /trainee2021/contact-us/contactus:
 *  get:
 *   summary: get all users
 *   description: get all users
 *   responses:
 *    200:
 *     description: success
 *    500:
 *     description: error
 */
router.get('/getContact', controller.getUsers);
/**
 * @swagger
 *  /trainee2021/contact-us/contactus/{id}:
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
router.get('/getContact/:id', controller.getUserById);
// router.delete('/contactus/:id',controller.deleteUsers);
// router.put('/contactus/:id',controller.updateUsers);
// NewsLetter Routes
// create subscriber
/**
 * @swagger
 * /trainee2021/contact-us/newsletter/sb-user:
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
router.post('/newsletter/sb-user', (0, celebrate_1.celebrate)(addSubscriber), subUserController.createSubUser);
// confirm user email for send news letter
router.get('/sb-User/activate/:token', subUserController.subConfirmation);
// send email to all
router.get('/sb-User/send-email', subUserController.sendEmailToAll);
// get all subscriber
router.get('/newsletter/sb-user', subUserController.getAllSubUsers);
// get subscriber by id
router.get('/newsletter/sb-user/:id', (0, celebrate_1.celebrate)(getSubscriber), subUserController.getSubUserById);
module.exports = router;
