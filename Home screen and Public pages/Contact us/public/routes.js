"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var users_repository_1 = require("./Users/users.repository");
var users_model_1 = require("./Users/users.model");
var users_controller_1 = require("./Users/users.controller");
var users_service_1 = require("./Users/users.service");
// import { AttachmentController } from "./Attachment/attachment.controller";
// import { AttachmentRepository } from "./Attachment/attachment.repository";
// import { AttachmentService } from "./Attachment/attachment.service";
var add = users_model_1.ContactUsSchema.add;
var router = express_1.default.Router();
var corsOption = {
    origin: 'http://example.com',
    optionSuccessStatus: 200
};
var repo = new users_repository_1.UsersRepository();
var service = new users_service_1.UsersService(repo);
var controller = new users_controller_1.UsersController(service);
// const attachmentRepo:AttachmentRepository = new AttachmentRepository();
// const attachmentService:AttachmentService = new AttachmentService(attachmentRepo);
// const attachmentController:AttachmentController = new AttachmentController(attachmentService);
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
 *    Subject:
 *     type: string
 *     description: subject
 *     example: 'subject'
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
 *    CreatedBy:
 *     type: integer
 *     description: creator
 *     example: 1
 *    Status:
 *     type: integer
 *     description: status
 *     example: 0|1
 *    Priority:
 *     type: integer
 *     description: priority
 *    AssignedToUser:
 *     type: integer
 *     description: 1|0
 *     example: ''
 *    IsDeleted:
 *     type: integer
 *     description: deleted
 *     example: 1|0
 */
//ContectUs routes
/**
 * @swagger
 * /contactus:
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
router.post('/contactus', controller.createUsers);
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
router.get('/contactus', controller.getUsers);
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
router.get('/contactus/:id', controller.getUserById);
module.exports = router;
