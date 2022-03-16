import express from "express";
import { celebrate } from "celebrate";

import { DashboardRepository } from "../Customer API/Dashboard/dashboard.repository";
import { DashboardService } from "../Customer API/Dashboard/dashboard.service";
import { DashboardController } from "../Customer API/Dashboard/dashboard.controller";

import { ServiceHistoryRepository } from "../Customer API/Service History/servicehistory.repository";
import { ServiceHistoryService } from "../Customer API/Service History/servicehistory.service";
import { ServiceHistoryController } from "../Customer API/Service History/servicehistory.controller";

import { FavoriteProsRepository } from "../Customer API/Favorite Pros/favorite-pros.repository";
import { FavoriteProsService } from "../Customer API/Favorite Pros/favorite-pros.service";
import { FavoriteProsController } from "../Customer API/Favorite Pros/favorite-pros.controller";

import { MySettingsRepository } from "../Customer API/My Settings/mysettings.repository";
import { MySettingsService } from "../Customer API/My Settings/mysettings.service";
import { MySettingsController } from "../Customer API/My Settings/mysettings.controller";

import { LoginRepository } from "../Login API/Login/login.repository";
import { LoginService } from "../Login API/Login/login.service";
import { LoginController } from "../Login API/Login/login.controller";

//Validation models
import { DashboardSchema } from "../Customer API/Dashboard/dashboard.model";
const { RescheduleSR, CancelSR, GetDashboard } = DashboardSchema;

import { ServiceHistorySchema } from "../Customer API/Service History/servicehistory.model";
const {Ratings} = ServiceHistorySchema;

import { FavoriteProsSchema } from "../Customer API/Favorite Pros/favorite-pros.model";
const {Favorite, Blocked} = FavoriteProsSchema;

import { MySettingsSchema } from "../Customer API/My Settings/mysettings.model";
const {UpdateUser, UpdateCreateUserAddress, ChangePassword} = MySettingsSchema;

const router: express.Router = express.Router();

const dashboardRepo: DashboardRepository = new DashboardRepository();
const dashboardService: DashboardService = new DashboardService(dashboardRepo);
const dashboardController: DashboardController = new DashboardController(
  dashboardService
);

const serviceHistoryRepo: ServiceHistoryRepository =
  new ServiceHistoryRepository();
const serviceHistoryService: ServiceHistoryService = new ServiceHistoryService(
  serviceHistoryRepo
);
const serviceHistoryController: ServiceHistoryController =
  new ServiceHistoryController(serviceHistoryService);

const favoriteProsRepo: FavoriteProsRepository = new FavoriteProsRepository();
const favoriteProsService: FavoriteProsService = new FavoriteProsService(
  favoriteProsRepo
);
const favoriteProsController: FavoriteProsController =
  new FavoriteProsController(favoriteProsService);

const mySettingsRepo: MySettingsRepository = new MySettingsRepository();
const mySettingsService: MySettingsService = new MySettingsService(
  mySettingsRepo
);
const mySettingsController: MySettingsController = new MySettingsController(
  mySettingsService
);

const loginRepo: LoginRepository = new LoginRepository();
const loginService: LoginService = new LoginService(loginRepo);
const loginController: LoginController = new LoginController(loginService);

// Customer's Routes

//Dashboard routes
router.get(
  "/dashboard",
  loginController.validateToken,
  dashboardController.getServiceRequest
);

router.get(
  "/dashboard/detail/:id",
  celebrate(GetDashboard),
  loginController.validateToken,
  dashboardController.getServiceRequestDetailById
);

router.post(
  "/rescheduleService/:serviceId",
  celebrate(RescheduleSR),
  loginController.validateToken,
  dashboardController.rescheduleService,
  dashboardController.rescheduleIfTimeSlotNotConflicts
);

router.post(
  "/CancelServiceRequest/:srId",
  celebrate(CancelSR),
  loginController.validateToken,
  dashboardController.cancelServiceRequest
);

//Service history routes
router.get(
  "/service-history",
  loginController.validateToken,
  serviceHistoryController.getCancelledOrCompletedSR
);

router.get(
  "/service-history/:id",
  loginController.validateToken,
  serviceHistoryController.getServiceRequestDetailById
);

router.get(
  "/history/download",
  loginController.validateToken,
  serviceHistoryController.exportDataInExcelFormat
);

router.post(
  "/rating/:serviceId",
  celebrate(Ratings),
  loginController.validateToken,
  serviceHistoryController.rateServiceProvider
);

//Favorite And Blocked routes

router.get(
  "/favorite-pros",
  loginController.validateToken,
  favoriteProsController.getAllHelperWorkedWithCustomer
);

router.post(
  "/favorite-pros/:helperId",
  celebrate(Favorite),
  loginController.validateToken,
  favoriteProsController.createFavoriteHelper,
  favoriteProsController.removeFavoriteHelper
);

router.post(
  "/block-pros/:helperId",
  celebrate(Blocked),
  loginController.validateToken,
  favoriteProsController.blockHelper,
  favoriteProsController.removeBlockedHelper
);

//My Settings routes

//-My details
router.get(
  "/my-details",
  loginController.validateToken,
  mySettingsController.getUserDetailById
);

router.put(
  "/my-details",
  celebrate(UpdateUser),
  loginController.validateToken,
  mySettingsController.updateUserDetailById
);

//-My Address
router.get(
  "/my-address",
  loginController.validateToken,
  mySettingsController.getUserAddressesByUserId
);

router.get(
  "/my-address/:addressId",
  loginController.validateToken,
  mySettingsController.getUserAddressByAddressId
);

router.put(
  "/my-address/:addressId",
  celebrate(UpdateCreateUserAddress),
  loginController.validateToken,
  mySettingsController.updateUserAddressByAddressId
);

router.post(
  "/my-address",
  celebrate(UpdateCreateUserAddress),
  loginController.validateToken,
  mySettingsController.createUserAddress
);

router.put(
  "/my-address/deleteAddress/:addressId",
  loginController.validateToken,
  mySettingsController.deleteUserAddressByAddressId
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
 *  RescheduleService:
 *   type: object
 *   properties:
 *    date:
 *     type: string
 *     description: date
 *     example: "30-02-2022"
 *    time:
 *     type: string
 *     description: time
 *     example: "16:30"
 *  CancelService:
 *   type: object
 *   properties:
 *    comment:
 *     type: string
 *     description: comment
 *     example: "why you want to cancel service request"
 *  Ratings:
 *   type: object
 *   properties:
 *    Comments:
 *     type: string
 *     description: date
 *     example: "30-02-2022"
 *    OnTimeArrival:
 *     type: float
 *     description: rating
 *     example: 1.5
 *    Friendly:
 *     type: float
 *     description: rating
 *     example: 1
 *    QualityOfService:
 *     type: float
 *     description: rating
 *     example: 2
 *  Favorite:
 *   type: object
 *   properties:
 *    IsFavorite:
 *     type: boolean
 *     example: 'true'
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
 *    LanguageId:
 *     type: integer
 *     description: language 
 *     example: 1
 *  UpdateCreateAddress:
 *     type: object
 *     properties:
 *      StreetName:
 *       type: string
 *       description: address
 *       example: 'New Shaktivijay'
 *      HouseNumber:
 *       type: string
 *       description: house number
 *       example: '44'
 *      PostalCode:
 *       type: string
 *       description: zipcode
 *       example: '395006'
 *      City:
 *       type: string
 *       description: city
 *       example: 'Surat'
 *      Mobile:
 *       type: string
 *       description: phone number
 *       example: "7990602480"
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

//Dashboard//

/**
 * @swagger
 * /trainee2021/customer/dashboard:
 *  get:
 *   summary: Get requests of user
 *   description: User dashboard
 *   tags: 
 *    - Customer’s pages
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: requests found.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token.
 *    404:
 *     description: no pending service request found / no service request found for this user.
 *    500:
 *     description: internal server error.
 */

/**
 * @swagger
 * /trainee2021/customer/dashboard/detail/{id}:
 *  get:
 *   summary: Get request detail
 *   description: Request detail by id
 *   tags: 
 *    - Customer’s pages
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
 *     description: request detail found.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token.
 *    404:
 *     description: no service request detail found for this request.
 *    500:
 *     description: internal server error.
 */

 
 /**
 * @swagger
 * /trainee2021/customer/rescheduleService/{serviceId}:
 *  post:
 *   summary: Reschedule Service request
 *   description: Enter date and time
 *   tags: 
 *    - Customer’s pages
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: serviceId
 *      schema:
 *       type: integer
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/RescheduleService'
 *   responses:
 *    200:
 *     description: sevice request reschedule successfully.
 *    400:
 *     description: enter future date for reschedule service request.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    404:
 *     description: service request not found or No data found / service request id not found.
 *    422:
 *     description: error in rescheduling service request.
 *    500:
 *     description: failure in finding service provider.
 * 
 */

 /**
 * @swagger
 * /trainee2021/customer/CancelServiceRequest/{srId}:
 *  post:
 *   summary: Cancel Service request
 *   description: feedback
 *   tags: 
 *    - Customer’s pages
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: srId
 *      schema:
 *       type: integer
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/CancelService'
 *   responses:
 *    200:
 *     description: service request cancelled successfully.
 *    201:
 *     description: service request already canceled.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    404:
 *     description: helper not found.
 *    422:
 *     description: error in canceling service request.
 *    500:
 *     description: internal server error.
 * 
 */

 //Service history//

/**
 * @swagger
 * /trainee2021/customer/service-history:
 *  get:
 *   summary: User history
 *   description: history of users service request
 *   tags: 
 *    - Customer’s pages
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: history found.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token.
 *    404:
 *     description: service request history not found in past.
 *    500:
 *     description: internal server error.
 */

/**
 * @swagger
 * /trainee2021/customer/service-history/{id}:
 *  get:
 *   summary: history request detail
 *   description: users completed or cancelled service request detail
 *   tags: 
 *    - Customer’s pages
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
 *     description: detail found.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token.
 *    404:
 *     description: No service request detail found for this request.
 *    500:
 *     description: internal server error.
 */

  /**
 * @swagger
 * /trainee2021/customer/history/download:
 *  get:
 *   summary: History download
 *   description: download history
 *   tags: 
 *    - Customer’s pages 
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

 /**
 * @swagger
 * /trainee2021/customer/rating/{serviceId}:
 *  post:
 *   summary: Ratings
 *   description: rete service provider
 *   tags: 
 *    - Customer’s pages
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: serviceId
 *      schema:
 *       type: integer
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Ratings'
 *   responses:
 *    200:
 *     description: Success.
 *    201:
 *     description: ratings already set for this service request.
 *    400:
 *     description: service request not completed or service provider not found.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    404:
 *     description: helper not found / srvice request not found / request id not found.
 *    500:
 *     description: internal server error.
 * 
 */

 //Favorite And Blocked

 /**
 * @swagger
 * /trainee2021/customer/favorite-pros:
 *  get:
 *   summary: Favorite helper
 *   description: helper worked with customer in past
 *   tags: 
 *    - Customer’s pages
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: helper found.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token.
 *    404:
 *     description: no service provider found worked with customer in past.
 *    500:
 *     description: internal server error.
 */

  /**
 * @swagger
 * /trainee2021/customer/favorite-pros/{helperId}:
 *  post:
 *   summary: Favorite Service Provider
 *   description: Add or remove favorite service provider
 *   tags: 
 *    - Customer’s pages
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: helperId
 *      schema:
 *       type: integer
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Favorite'
 *   responses:
 *    200:
 *     description: favorite helper created successfully.
 *    201:
 *     description: favorite helper updated successfully.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    404:
 *     description: content not found / no service provider found worked with customer in past.
 *    409:
 *     description: helper already in you favorite list
 *    500:
 *     description: internal server error.
 *    502:
 *     description: error in creating favorite helper / error in creating favorite helper.
 * 
 */

    /**
 * @swagger
 * /trainee2021/customer/block-pros/{helperId}:
 *  post:
 *   summary: Block Service Provider
 *   description: Add or remove block service provider
 *   tags: 
 *    - Customer’s pages
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: helperId
 *      schema:
 *       type: integer
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Blocked'
 *   responses:
 *    200:
 *     description: blocked helper created successfully / helper removed from blocked list.
 *    201:
 *     description: helper added in blocked list.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    404:
 *     description: content not found / no service provider found worked with customer in past.
 *    409:
 *     description: helper already in you blocked/unblocked list.
 *    500:
 *     description: internal server error.
 *    502:
 *     description: error in adding / removing helper in blocked list or error in creating     blocked helper.
 * 
 */

//My Settings routes//

//-My details//

/**
 * @swagger
 * /trainee2021/customer/my-details:
 *  get:
 *   summary: User detail
 *   description: Display user details.
 *   tags: 
 *    - Customer’s pages
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
 * /trainee2021/customer/my-details:
 *  put:
 *   summary: Update User detail
 *   description: edit user details to update.
 *   tags: 
 *    - Customer’s pages
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
 *     description: detail updated.
 *    401:
 *     description: invalid login credential or unauthorised user or invalid or expired token.
 *    404:
 *     description: user not found.
 *    400:
 *     description: proper input not found in request.
 *    500:
 *     description: internal server error.
 */

//-My Address//

/**
 * @swagger
 * /trainee2021/customer/my-address:
 *  get:
 *   summary: User addresses
 *   description: Display user addresses.
 *   tags: 
 *    - Customer’s pages
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: addresses found.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token.
 *    404:
 *     description: address not found for this user.
 *    400:
 *     description: proper input not found in request.
 *    500:
 *     description: internal server error.
 */

/**
 * @swagger
 * /trainee2021/customer/my-address/{addressId}:
 *  get:
 *   summary: User addresses
 *   description: Display user addresses.
 *   tags: 
 *    - Customer’s pages
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: addressId
 *      schema:
 *       type: integer
 *   responses:
 *    200:
 *     description: address found.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token.
 *    404:
 *     description: address not found.
 *    400:
 *     description: proper input not found in request.
 *    500:
 *     description: internal server error.
 */

 /**
 * @swagger
 * /trainee2021/customer/my-address/{addressId}:
 *  put:
 *   summary: Update address
 *   description: Change detail to update address.
 *   tags: 
 *    - Customer’s pages
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: addressId
 *      schema:
 *       type: integer
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/UpdateCreateAddress'
 *   responses:
 *    201:
 *     description: address updated successfully.
 *    400:
 *     description: proper input not found in request.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    404:
 *     description: error in updating information.
 *    422:
 *     description: error in updating information.
 *    500:
 *     description: failure in finding service provider.
 * 
 */

 /**
 * @swagger
 * /trainee2021/customer/my-address:
 *  post:
 *   summary: Create address
 *   description: add new address
 *   tags: 
 *    - Customer’s pages
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/UpdateCreateAddress'
 *   responses:
 *    200:
 *     description: address created successfully.
 *    400:
 *     description: proper input not found in request.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    422:
 *     description: error in creating address.
 *    500:
 *     description: internal server error.
 * 
 */

 /**
 * @swagger
 * /trainee2021/customer/my-address/deleteAddress/{addressId}:
 *  put:
 *   summary: Delete address
 *   description: remove address.
 *   tags: 
 *    - Customer’s pages
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: addressId
 *      schema:
 *       type: integer
 *   responses:
 *    200:
 *     description: address deleted successfully.
 *    400:
 *     description: proper input not found in request.
 *    401:
 *     description: invalid login credential or unauthorised user or invalid or expired token.
 *    422:
 *     description: error in deleting address.
 *    500:
 *     description: internal server error.
 * 
 */

 //Change Password

  /**
 * @swagger
 * /trainee2021/customer/changePassword:
 *  put:
 *   summary: Change password
 *   description: enter old password and new password.
 *   tags: 
 *    - Customer’s pages
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
 *     description: Incorrect old password or new Password and Confirm Password must be same.
 *    401:
 *     description: invalid login credential or unauthorised user or invalid or expired token.
 *    422:
 *     description: error in changing password.
 *    500:
 *     description: internal server error.
 * 
 */
export = router;
