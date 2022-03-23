import express from "express";
import { BookServiceRepository } from "../ServiceSetup/bookservice.repository";
import { BookServiceController} from "../ServiceSetup/bookservice.controller";
import {BookService} from "../ServiceSetup/bookservice.service";
import { celebrate } from 'celebrate';

import { BookServiceSchema } from "../ServiceSetup/bookservice.model";

import { LoginRepository } from '../Login API/Login/login.repository';
import { LoginService } from '../Login API/Login/login.service';
import { LoginController} from '../Login API/Login/login.controller';

const router: express.Router = express.Router();


const repo: BookServiceRepository = new BookServiceRepository();
const service: BookService= new BookService(repo);
const controller: BookServiceController = new BookServiceController(service);

const loginRepo:LoginRepository = new LoginRepository();
const loginService:LoginService = new LoginService(loginRepo);
const loginController:LoginController = new LoginController(loginService);

const { zipcode, userAddress, createService} = BookServiceSchema;









//Service Request routes

router.post('/postalcode-check',celebrate(zipcode),loginController.validateToken,controller.checkAvailibility);

// router.post('/CreateRequest', celebrate(createService),loginController.validateToken,controller.decodeToken, controller.CreateServiceRequest);

router.post('/CreateRequest', celebrate(createService),loginController.validateToken,controller.decodeToken, controller.saveServiceRequestDetail);

router.post('/save-cleaning-service-detail',loginController.validateToken, controller.saveCleaningServiceDetail );



//User routes

router.post('/UserAddress', celebrate(userAddress),loginController.validateToken,controller.createUserAddress);

router.get('/UserAddresses', loginController.validateToken,controller.getUserAddresses);

router.post('/createfb', loginController.validateToken,controller.createFavoriteAndBlocked);

router.get('/createfb', loginController.validateToken,controller.getFavoriteAndBlocked);



/**
 *@swagger
 * definitions:
 *  ServiceRequest:
 *   type: object
 *   properties:
 *    ServiceId:
 *     type: integer
 *     description: id of service
 *     example: 1
 *    ServiceStartDate:
 *     type: date
 *     description: date
 *     example: '12-02-22'
 *    ServiceStartTime:
 *     type: string
 *     description: time
 *     example: '12:00'
 *    ServiceHours:
 *     type: integer
 *     description: hours
 *     example: 3
 *    Comments:
 *     type: string
 *     description: comment
 *     example: 'Hi Hello'
 *    PaymentDue:
 *     type: boolean
 *     example: 'true'
 *    HasPets:
 *     type: boolean
 *     example: 'true'
 *    ExtraService:
 *     type: array
 *     items:
 *      type: object
 *      properties:
 *       ServiceExtraId:
 *        type: integer
 *        description: extra service
 *        example: 1
 *  CheckZipCode:
 *   type: object
 *   properties:
 *    postalcode:
 *     type: string
 *     description: postal code
 *     example: '395006'
 *  yourDetails:
 *   type: object
 *   properties:
 *    ServiceRequestId:
 *     type: integer
 *     description: request id
 *     example: 78
 *    AddressId:
 *     type: integer
 *     description: request id
 *     example: 8
 *    ServiceProviderId:
 *     type: integer
 *     description: request id
 *     example: 3
 *  UserAddress:
 *     type: object
 *     properties:
 *      Addressline1:
 *       type: string
 *       description: address
 *       example: 'New Shaktivijay'
 *      Addressline2:
 *       type: string
 *       description: house number
 *       example: '44'
 *      City:
 *       type: string
 *       description: city
 *       example: 'Surat'
 *      State:
 *       type: string
 *       description: state
 *       example: 'Gujarat'
 *      IsDefault:
 *       type: boolean
 *       example: 'true'
 *      IsDeleted:
 *       type: boolean
 *       example: 'false'
 *      Mobile:
 *       type: string
 *       description: phone number
 *       example: '7990602480'
 */


 //Postal code check
 /**
 * @swagger
 * /trainee2021/bookservice/postalcode-check:
 *  post:
 *   summary: Check helper availibility
 *   description: Enter zip code
 *   tags: 
 *    - Book Service
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/CheckZipCode'
 *   responses:
 *    200:
 *     description: service provider found
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    404:
 *     description: We are not providing service in this area.
 *    500:
 *     description: failure in finding service provider.
 * 
 */

//Save secedule and plan 
/**
 * @swagger
 * /trainee2021/bookservice/CreateRequest:
 *  post:
 *   summary: Create Service Request
 *   description: service setup
 *   tags: 
 *    - Book Service
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/ServiceRequest'
 *   responses:
 *    200:
 *     description: service booked successfully
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    404:
 *     description: user not found
 *    500:
 *     description: failure in service booking.
 */

//Complete service request
/**
 * @swagger
 * /trainee2021/bookservice/save-cleaning-service-detail:
 *  post:
 *   summary: Complete Service Request
 *   description: enter your details
 *   tags: 
 *    - Book Service
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/yourDetails'
 *   responses:
 *    200:
 *     description: service booked successfully
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    404:
 *     description: user not found
 *    500:
 *     description: failure in service booking.
 */

//Create address
/**
 * @swagger
 * /trainee2021/bookservice/UserAddress:
 *  post:
 *   summary: Create Address
 *   description: Enter address
 *   tags: 
 *    - Book Service
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/UserAddress'
 *   responses:
 *    200:
 *     description: address created successfully
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    404:
 *     description: user not found
 *    500:
 *     description: failure in creating address.
 */

//Display user addresses
/**
 * @swagger
 * /trainee2021/bookservice/UserAddresses:
 *  get:
 *   summary: Get user addresses
 *   description: get address
 *   tags: 
 *    - Book Service
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: address found
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    404:
 *     description: user not found or Addresses not found
 *    500:
 *     description: failure in finding address
 */

//Get favorite and blocked
/**
 * @swagger
 * /trainee2021/bookservice/createfb:
 *  get:
 *   summary: Get favorite and blocked 
 *   description: favorite and blocked user
 *   tags: 
 *    - Book Service
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: user found
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    404:
 *     description: user not found
 *    500:
 *     description: failure in finding user
 */

export = router;