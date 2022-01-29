import express from "express";
import { celebrate } from 'celebrate';
import { UsersRepository } from "./Users/users.repository";
import { ContactUsSchema } from "./Users/users.model";
import { UsersController } from "./Users/users.controller";
import {UsersService} from "./Users/users.service";


// import { AttachmentController } from "./Attachment/attachment.controller";
// import { AttachmentRepository } from "./Attachment/attachment.repository";
// import { AttachmentService } from "./Attachment/attachment.service";

const {add} = ContactUsSchema;
const router: express.Router = express.Router();

var corsOption={
    origin : 'http://example.com',
    optionSuccessStatus:200
}


const repo: UsersRepository = new UsersRepository();
const service: UsersService= new UsersService(repo);
const controller: UsersController = new UsersController(service);

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
 *    PhoneNumber:
 *     type: integer
 *     description: phone number
 *     example: '1234567810'
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
 *    Status:
 *     type: integer
 *     description: status
 *    Priority:
 *     type: integer
 *     description: priority
 *    AssignedToUser:
 *     type: integer
 *     description: 1|0
 *    IsDeleted:
 *     type: integer
 *     description: deleted 
 *     example: 1
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
router.get('/contactus',controller.getUsers);

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
router.get('/contactus/:id',controller.getUserById);
// router.delete('/contactus/:id',controller.deleteUsers);
// router.put('/contactus/:id',controller.updateUsers);

// //Attachment routes
// router.post('/attachment', attachmentController.createAttachment);


export = router;