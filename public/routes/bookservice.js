"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var bookservice_repository_1 = require("../ServiceSetup/bookservice.repository");
var bookservice_controller_1 = require("../ServiceSetup/bookservice.controller");
var bookservice_service_1 = require("../ServiceSetup/bookservice.service");
var celebrate_1 = require("celebrate");
var bookservice_model_1 = require("../ServiceSetup/bookservice.model");
var login_repository_1 = require("../Login API/Login/login.repository");
var login_service_1 = require("../Login API/Login/login.service");
var login_controller_1 = require("../Login API/Login/login.controller");
var router = express_1.default.Router();
var repo = new bookservice_repository_1.BookServiceRepository();
var service = new bookservice_service_1.BookService(repo);
var controller = new bookservice_controller_1.BookServiceController(service);
var loginRepo = new login_repository_1.LoginRepository();
var loginService = new login_service_1.LoginService(loginRepo);
var loginController = new login_controller_1.LoginController(loginService);
var zipcode = bookservice_model_1.BookServiceSchema.zipcode, userAddress = bookservice_model_1.BookServiceSchema.userAddress, createService = bookservice_model_1.BookServiceSchema.createService;
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
 *    ServiceRequestAddress:
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
 *      Mobile:
 *       type: string
 *       description: phone number
 *       example: '7990602480'
 *      PostalCode:
 *       type: string
 *       description: zipcode
 *       example: '395006'
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
//Service Request routes
/**
 * @swagger
 * /trainee2021/bookservice/postalcode-check:
 *  post:
 *   summary: Check helper availibility
 *   description: Enter zip code
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
router.post('/postalcode-check', (0, celebrate_1.celebrate)(zipcode), loginController.validateToken, controller.checkAvailibility);
/**
 * @swagger
 * /trainee2021/bookservice/CreateRequest:
 *  post:
 *   summary: Create Service Request
 *   description: service setup
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
router.post('/CreateRequest', (0, celebrate_1.celebrate)(createService), loginController.validateToken, controller.decodeToken, controller.CreateServiceRequest);
//User routes
/**
 * @swagger
 * /trainee2021/bookservice/UserAddress:
 *  post:
 *   summary: Create Address
 *   description: Enter address
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
router.post('/UserAddress', (0, celebrate_1.celebrate)(userAddress), loginController.validateToken, controller.createUserAddress);
/**
 * @swagger
 * /trainee2021/bookservice/UserAddresses:
 *  get:
 *   summary: Get user addresses
 *   description: get address
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
router.get('/UserAddresses', loginController.validateToken, controller.getUserAddresses);
router.post('/createfb', loginController.validateToken, controller.createFavoriteAndBlocked);
/**
 * @swagger
 * /trainee2021/bookservice/createfb:
 *  get:
 *   summary: Get favorite and blocked
 *   description: favorite and blocked user
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
router.get('/createfb', loginController.validateToken, controller.getFavoriteAndBlocked);
module.exports = router;
