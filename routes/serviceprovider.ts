import express from "express";
import { celebrate } from "celebrate";

import { ServiceRequestRepository } from "../ServiceProvider API/Service Requests/servicerequest.repository";
import { ServiceRequestService } from "../ServiceProvider API/Service Requests/servicerequest.service";
import { ServiceRequestController } from "../ServiceProvider API/Service Requests/servicerequest.controller";

import { UpcomingServicesRepository } from "../ServiceProvider API/Upcoming services/upcomingservices.repository";
import { UpcomingService } from "../ServiceProvider API/Upcoming services/upcomingservices.service";
import { UpcomingServiceController } from "../ServiceProvider API/Upcoming services/upcomingservices.controller";

import { ServiceHistoryRepository } from "../ServiceProvider API/Service History/servicehistory.repository";
import { ServiceHistoryController } from "../ServiceProvider API/Service History/servicehistory.controller";
import { ServiceHistoryService } from "../ServiceProvider API/Service History/servicehistory.service";

import { BlockCustomerRepository } from "../ServiceProvider API/Block Customer/blockcustomer.repository";
import { BlockCustomerService } from "../ServiceProvider API/Block Customer/blockcustomer.service";
import { BlockCustomerController } from "../ServiceProvider API/Block Customer/blockcustomer.controller";

import { MySettingsRepository } from "../ServiceProvider API/My Settings/mysettings.repository";
import { MySettingsService } from "../ServiceProvider API/My Settings/mysettings.service";
import { MySettingsController } from "../ServiceProvider API/My Settings/mysettings.controller";

import { LoginRepository } from "../Login API/Login/login.repository";
import { LoginService } from "../Login API/Login/login.service";
import { LoginController } from "../Login API/Login/login.controller";

import { MySettingsSchema } from "../ServiceProvider API/My Settings/mysettings.model";
const { UpdateUser, ChangePassword } = MySettingsSchema;

import { BlockCustomerSchema } from "../ServiceProvider API/Block Customer/blockcustomer.model";
const { Blocked } = BlockCustomerSchema;

const router: express.Router = express.Router();

const serviceRequestRepo: ServiceRequestRepository = new ServiceRequestRepository();
const serviceRequestService: ServiceRequestService = new ServiceRequestService(
serviceRequestRepo);
const serviceRequestController: ServiceRequestController =new ServiceRequestController(serviceRequestService);

const upcomingServiceRepo: UpcomingServicesRepository =new UpcomingServicesRepository();
const upcomingService: UpcomingService = new UpcomingService(upcomingServiceRepo);
const upcomingServiceController: UpcomingServiceController = new UpcomingServiceController(upcomingService);

const serviceHistoryRepo: ServiceHistoryRepository =new ServiceHistoryRepository();
const serviceHistoryService: ServiceHistoryService = new ServiceHistoryService(serviceHistoryRepo);
const serviceHistoryController: ServiceHistoryController = new ServiceHistoryController(serviceHistoryService);

const blockCustomerRepo: BlockCustomerRepository =new BlockCustomerRepository();
const blockCustomerService: BlockCustomerService = new BlockCustomerService(blockCustomerRepo);
const blockCustomerController: BlockCustomerController =new BlockCustomerController(blockCustomerService);

const mySettingsRepo: MySettingsRepository = new MySettingsRepository();
const mySettingsService: MySettingsService = new MySettingsService(mySettingsRepo);
const mySettingsController: MySettingsController = new MySettingsController(mySettingsService);

const loginRepo: LoginRepository = new LoginRepository();
const loginService: LoginService = new LoginService(loginRepo);
const loginController: LoginController = new LoginController(loginService);

//New Service Requests
router.get(
  "/sp-new-service-requests",
  loginController.validateToken,
  serviceRequestController.getAllNewServiceRequests
);

router.get(
  "/sp-accept-request/:requestId",
  loginController.validateToken,
  serviceRequestController.acceptableNewServiceRequestOrNot,
  serviceRequestController.acceptNewServiceRequest
);

router.get(
  "/service-request-detail/:requestId",
  loginController.validateToken,
  serviceRequestController.getServiceRequestDetailById
);

//Upcoming Services
router.get(
  "/sp-upcoming-service-request",
  loginController.validateToken,
  upcomingServiceController.getUpcomingServices
);

router.put(
  "/sp-cancel-service-request/:requestId",
  loginController.validateToken,
  upcomingServiceController.cancelServiceRequest
);

router.put(
  "/sp-complete-service-request/:requestId",
  loginController.validateToken,
  upcomingServiceController.completeServiceRequest
);

router.get(
  "/service-detail/:id",
  loginController.validateToken,
  upcomingServiceController.getServiceRequestDetailById
);

//Service History
router.get(
  "/sp-service-request-history",
  loginController.validateToken,
  serviceHistoryController.getCompletedServiceRequest
);

router.get(
  "/service-request-history-detail/:id",
  loginController.validateToken,
  serviceHistoryController.getServiceRequestDetailById
);

router.get(
  "/history/download",
  loginController.validateToken,
  serviceHistoryController.exportDataInExcelFormat
);

//Ratings
router.get(
  "/sp-ratings",
  loginController.validateToken,
  serviceHistoryController.displayRatingsOfHelper
);

//Block Unblock Customer
router.get(
  "/get-customer-for-helper",
  loginController.validateToken,
  blockCustomerController.getCustomerWorkedWithHelper
);

router.put(
  "/block-unblock-customer/:userId",
  celebrate(Blocked),
  loginController.validateToken,
  blockCustomerController.addCustomerInBlockList,
  blockCustomerController.removeCustomerFromBlockList
);

//My settings
router.get(
  "/my-details",
  loginController.validateToken,
  mySettingsController.getUserDetailById
);

router.put(
  "/my-details",
  celebrate(UpdateUser),
  loginController.validateToken,
  mySettingsController.updateUserDetailById,
  mySettingsController.updateOrCreateAddress
);

//Change Password
router.put(
  "/changePassword",
  celebrate(ChangePassword),
  loginController.validateToken,
  mySettingsController.changeUserPassword
);


/**
 *@swagger
 * definitions:
 *  Blocked:
 *   type: object
 *   properties:
 *    IsBlocked:
 *     type: boolean
 *     example: 'true'
 *  UpdateUser:
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
 *    Mobile:
 *     type: string
 *     description: phone number
 *     example: "7990602480"
 *    DateOfBirth:
 *     type: string
 *     description: birth date
 *     example: "30-10-2000"
 *    NationalityId:
 *     type: integer
 *     description: nationality
 *     example: 1 
 *    Gender:
 *     type: string
 *     description: gender
 *     example: "Male / Female"
 *    Address:
 *      type: object
 *      properties:
 *       StreetName:
 *        type: string
 *        description: address
 *        example: 'New Shaktivijay'
 *       HouseNumber:
 *        type: string
 *        description: house number
 *        example: '44'
 *       PostalCode:
 *        type: string
 *        description: zipcode
 *        example: '395006'
 *       City:
 *        type: string
 *        description: city
 *        example: 'Surat'
 *  ChangePassword:
 *   type: object
 *   properties: 
 *    OldPassword:
 *     type: string
 *     description: password
 *     example: '123456'
 *    NewPassword:
 *     type: string
 *     description: password
 *     example: 'Ya36900369'
 *    ConfirmPassword:
 *     type: string
 *     description: password
 *     example: 'Ya36900369'
 */

//New Service Requests

/**
 * @swagger
 * /trainee2021/serviceprovider/sp-new-service-requests:
 *  get:
 *   summary: New serivce requests 
 *   description: Service requests
 *   tags: 
 *    - Service Provider Screens 
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: service request accepted successfully.
 *    401:
 *     description: invalid login credential or unauthorised user or invalid or expired token.
 *    404:
 *     description: you have not provided zipcode in your detail please update your detail to get requests available in your entered zipcode area / service requests not found / helper not found.
 *    500:
 *     description: internal server error.
 */

/**
 * @swagger
 * /trainee2021/serviceprovider/sp-accept-request/{requestId}:
 *  get:
 *   summary: Accept service request
 *   description: helper can accept new service request
 *   tags: 
 *    - Service Provider Screens 
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: requestId
 *      schema:
 *       type: integer
 *   responses:
 *    200:
 *     description: service request accepted successfully.
 *    400: 
 *     description: proper input not found in request.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token.
 *    404:
 *     description: no service request detail found for this request / error in accepting service request.
 *    422:
 *     description: another service request has already been assigned which has time overlap with this service request. You can’t pick this one! / this service request is no more available. It has been assigned to another provider
 *    500:
 *     description: internal server error.
 */

 
 /**
 * @swagger
 * /trainee2021/serviceprovider/service-request-detail/{requestId}:
 *  get:
 *   summary: Service request detail
 *   description: display service request detail
 *   tags: 
 *    - Service Provider Screens 
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: requestId
 *      schema:
 *       type: integer
 *   responses:
 *    200:
 *     description: sevice request detail.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    404:
 *     description: request detail not available.
 *    500:
 *     description: internal server error.
 * 
 */

 //Upcoming Services

 /**
 * @swagger
 * /trainee2021/serviceprovider/sp-upcoming-service-request:
 *  get:
 *   summary: Upcoming service request
 *   description: display upcoming service requests
 *   tags: 
 *    - Service Provider Screens 
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: upcoming service requests.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    404:
 *     description: no upcoming service requests found.
 *    500:
 *     description: internal server error.
 * 
 */

/**
 * @swagger
 * /trainee2021/serviceprovider/sp-cancel-service-request/{requestId}:
 *  put:
 *   summary: Cancel service request
 *   description: Cancel service request
 *   tags: 
 *    - Service Provider Screens 
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: requestId
 *      schema:
 *       type: integer
 *   responses:
 *    200:
 *     description: service request cancelled successfully.
 *    400:
 *     description: service request id not found.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token.
 *    404:
 *     description: service request detail not found.
 *    422:
 *     description: error in cancelling service request
 *    500:
 *     description: internal server error.
 */

/**
 * @swagger
 * /trainee2021/serviceprovider/sp-complete-service-request/{requestId}:
 *  put:
 *   summary: Complete service request
 *   description: complete service request
 *   tags: 
 *    - Service Provider Screens 
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: requestId
 *      schema:
 *       type: integer
 *   responses:
 *    200:
 *     description: service request completed successfully.
 *    400:
 *     description: You can not complete service request before end time / service request id not found.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token.
 *    404:
 *     description: service request detail not found.
 *    422:
 *     description: error in updating service request
 *    500:
 *     description: internal server error.
 */

 /**
 * @swagger
 * /trainee2021/serviceprovider/service-detail/{id}:
 *  get:
 *   summary: Service request detail
 *   description: display service request detail
 *   tags: 
 *    - Service Provider Screens  
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *   responses:
 *    200:
 *     description: sevice request detail.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    404:
 *     description: request detail not available.
 *    500:
 *     description: internal server error.
 * 
 */

//Service History

/**
 * @swagger
 * /trainee2021/serviceprovider/sp-service-request-history:
 *  get:
 *   summary:  Serivce request history 
 *   description: service request history
 *   tags: 
 *    - Service Provider Screens 
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: service request history.
 *    401:
 *     description: invalid login credential or unauthorised user or invalid or expired token.
 *    404:
 *     description: service request history not found in past / service request not found.
 *    500:
 *     description: internal server error.
 */

 /**
 * @swagger
 * /trainee2021/serviceprovider/service-request-history-detail/{id}:
 *  get:
 *   summary: Service request detail
 *   description: display service request detail
 *   tags: 
 *    - Service Provider Screens 
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *   responses:
 *    200:
 *     description: sevice request detail.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    404:
 *     description: no service request detail found for this request.
 *    500:
 *     description: internal server error.
 * 
 */

  /**
 * @swagger
 * /trainee2021/serviceprovider/history/download:
 *  get:
 *   summary: History download
 *   description: download history
 *   tags: 
 *    - Service Provider Screens 
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: sevice request detail.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    404:
 *     description: no data to export.
 *    500:
 *     description: internal server error.
 * 
 */

//Ratings

/**
 * @swagger
 * /trainee2021/serviceprovider/sp-ratings:
 *  get:
 *   summary:  Ratings
 *   description:  display ratings of service provider given by customer
 *   tags: 
 *    - Service Provider Screens 
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: ratings.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token.
 *    404:
 *     description: ratings / data not found.
 *    500:
 *     description: internal server error.
 */

//Block Unblock Customer

 /**
 * @swagger
 * /trainee2021/serviceprovider/get-customer-for-helper:
 *  get:
 *   summary: Display customers
 *   description: list of customers worked with service provider in past
 *   tags: 
 *    - Service Provider Screens 
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: customers.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    404:
 *     description: customers not found.
 *    500:
 *     description: internal server error.
 * 
 */

 /**
 * @swagger
 * /trainee2021/serviceprovider/block-unblock-customer/{userId}:
 *  put:
 *   summary: Block unblock customer
 *   description: block unblock customer worked with service provider in past
 *   tags: 
 *    - Service Provider Screens 
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: userId
 *      schema:
 *       type: integer
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Blocked'
 *   responses:
 *    200:
 *     description: customer successfully added in block / unblock list.
 *    201:
 *     description: customer alraedy in blocked/unblocked list.
 *    400: 
 *     description: helper has not worked for this customer. / proper input not found in request body.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token.
 *    404:
 *     description: no service provider found worked with customer in past / no customer in blocklist to unblock.
 *    422:
 *     description: error in adding blocked / unblocked list.
 *    500:
 *     description: internal server error.
 */

//My settings

//-My details//

/**
 * @swagger
 * /trainee2021/serviceprovider/my-details:
 *  get:
 *   summary: Service provider detail
 *   description: display service provider details.
 *   tags: 
 *    - Service Provider Screens 
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: detail found.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token.
 *    404:
 *     description: user not found.
 *    400:
 *     description: proper input not found in request.
 *    500:
 *     description: internal server error.
 */

/**
 * @swagger
 * /trainee2021/serviceprovider/my-details:
 *  put:
 *   summary: Update service provider detail
 *   description: edit user details to update.
 *   tags: 
 *    - Service Provider Screens
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/UpdateUser'
 *   responses:
 *    200:
 *     description: details updated successfully.
 *    400:
 *     description: proper input not found in request.
 *    401:
 *     description: invalid login credential or unauthorised user or invalid or expired token.
 *    422: 
 *     description: error in updating user detail.
 *    500:
 *     description: internal server error.
 */

 //Change Password

  /**
 * @swagger
 * /trainee2021/serviceprovider/changePassword:
 *  put:
 *   summary: Change password
 *   description: enter old password and new password.
 *   tags: 
 *    - Service Provider Screens
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/ChangePassword'
 *   responses:
 *    200:
 *     description: password changed successfully.
 *    400:
 *     description: incorrect old password or new Password and confirm Password must be same.
 *    401:
 *     description: invalid login credential or unauthorised user or invalid or expired token.
 *    422:
 *     description: error in changing password.
 *    500:
 *     description: internal server error.
 * 
 */

export = router;
