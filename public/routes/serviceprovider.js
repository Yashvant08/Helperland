"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var celebrate_1 = require("celebrate");
var servicerequest_repository_1 = require("../ServiceProvider API/Service Requests/servicerequest.repository");
var servicerequest_service_1 = require("../ServiceProvider API/Service Requests/servicerequest.service");
var servicerequest_controller_1 = require("../ServiceProvider API/Service Requests/servicerequest.controller");
var upcomingservices_repository_1 = require("../ServiceProvider API/Upcoming services/upcomingservices.repository");
var upcomingservices_service_1 = require("../ServiceProvider API/Upcoming services/upcomingservices.service");
var upcomingservices_controller_1 = require("../ServiceProvider API/Upcoming services/upcomingservices.controller");
var servicehistory_repository_1 = require("../ServiceProvider API/Service History/servicehistory.repository");
var servicehistory_controller_1 = require("../ServiceProvider API/Service History/servicehistory.controller");
var servicehistory_service_1 = require("../ServiceProvider API/Service History/servicehistory.service");
var blockcustomer_repository_1 = require("../ServiceProvider API/Block Customer/blockcustomer.repository");
var blockcustomer_service_1 = require("../ServiceProvider API/Block Customer/blockcustomer.service");
var blockcustomer_controller_1 = require("../ServiceProvider API/Block Customer/blockcustomer.controller");
var mysettings_repository_1 = require("../ServiceProvider API/My Settings/mysettings.repository");
var mysettings_service_1 = require("../ServiceProvider API/My Settings/mysettings.service");
var mysettings_controller_1 = require("../ServiceProvider API/My Settings/mysettings.controller");
var login_repository_1 = require("../Login API/Login/login.repository");
var login_service_1 = require("../Login API/Login/login.service");
var login_controller_1 = require("../Login API/Login/login.controller");
var mysettings_model_1 = require("../ServiceProvider API/My Settings/mysettings.model");
var UpdateUser = mysettings_model_1.MySettingsSchema.UpdateUser, ChangePassword = mysettings_model_1.MySettingsSchema.ChangePassword;
var blockcustomer_model_1 = require("../ServiceProvider API/Block Customer/blockcustomer.model");
var Blocked = blockcustomer_model_1.BlockCustomerSchema.Blocked;
var router = express_1.default.Router();
var serviceRequestRepo = new servicerequest_repository_1.ServiceRequestRepository();
var serviceRequestService = new servicerequest_service_1.ServiceRequestService(serviceRequestRepo);
var serviceRequestController = new servicerequest_controller_1.ServiceRequestController(serviceRequestService);
var upcomingServiceRepo = new upcomingservices_repository_1.UpcomingServicesRepository();
var upcomingService = new upcomingservices_service_1.UpcomingService(upcomingServiceRepo);
var upcomingServiceController = new upcomingservices_controller_1.UpcomingServiceController(upcomingService);
var serviceHistoryRepo = new servicehistory_repository_1.ServiceHistoryRepository();
var serviceHistoryService = new servicehistory_service_1.ServiceHistoryService(serviceHistoryRepo);
var serviceHistoryController = new servicehistory_controller_1.ServiceHistoryController(serviceHistoryService);
var blockCustomerRepo = new blockcustomer_repository_1.BlockCustomerRepository();
var blockCustomerService = new blockcustomer_service_1.BlockCustomerService(blockCustomerRepo);
var blockCustomerController = new blockcustomer_controller_1.BlockCustomerController(blockCustomerService);
var mySettingsRepo = new mysettings_repository_1.MySettingsRepository();
var mySettingsService = new mysettings_service_1.MySettingsService(mySettingsRepo);
var mySettingsController = new mysettings_controller_1.MySettingsController(mySettingsService);
var loginRepo = new login_repository_1.LoginRepository();
var loginService = new login_service_1.LoginService(loginRepo);
var loginController = new login_controller_1.LoginController(loginService);
//New Service Requests
router.get("/sp-new-service-requests", loginController.validateToken, serviceRequestController.getAllNewServiceRequests);
router.get("/sp-accept-request/:requestId", loginController.validateToken, serviceRequestController.acceptableNewServiceRequestOrNot, serviceRequestController.acceptNewServiceRequest);
router.get("/service-request-detail/:requestId", loginController.validateToken, serviceRequestController.getServiceRequestDetailById);
//Upcoming Services
router.get("/sp-upcoming-service-request", loginController.validateToken, upcomingServiceController.getUpcomingServices);
router.put("/sp-cancel-service-request/:requestId", loginController.validateToken, upcomingServiceController.cancelServiceRequest);
router.put("/sp-complete-service-request/:requestId", loginController.validateToken, upcomingServiceController.completeServiceRequest);
router.get("/service-detail/:id", loginController.validateToken, upcomingServiceController.getServiceRequestDetailById);
//Service History
router.get("/sp-service-request-history", loginController.validateToken, serviceHistoryController.getCompletedServiceRequest);
router.get("/service-request-history-detail/:id", loginController.validateToken, serviceHistoryController.getServiceRequestDetailById);
router.get("/history/download", loginController.validateToken, serviceHistoryController.exportDataInExcelFormat);
//Ratings
router.get("/sp-ratings", loginController.validateToken, serviceHistoryController.displayRatingsOfHelper);
//Block Unblock Customer
router.get("/get-customer-for-helper", loginController.validateToken, blockCustomerController.getCustomerWorkedWithHelper);
router.put("/block-unblock-customer/:userId", (0, celebrate_1.celebrate)(Blocked), loginController.validateToken, blockCustomerController.addCustomerInBlockList, blockCustomerController.removeCustomerFromBlockList);
//My settings
router.get("/my-details", loginController.validateToken, mySettingsController.getUserDetailById);
router.put("/my-details", (0, celebrate_1.celebrate)(UpdateUser), loginController.validateToken, mySettingsController.updateUserDetailById, mySettingsController.updateOrCreateAddress);
//Change Password
router.put("/changePassword", (0, celebrate_1.celebrate)(ChangePassword), loginController.validateToken, mySettingsController.changeUserPassword);
module.exports = router;
