"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var celebrate_1 = require("celebrate");
var servicerequest_repository_1 = require("../Admin API/Service Requests/servicerequest.repository");
var servicerequest_service_1 = require("../Admin API/Service Requests/servicerequest.service");
var servicerequest_controller_1 = require("../Admin API/Service Requests/servicerequest.controller");
var usermanagement_repository_1 = require("../Admin API/User Management/usermanagement.repository");
var usermanagement_service_1 = require("../Admin API/User Management/usermanagement.service");
var usermanagement_controller_1 = require("../Admin API/User Management/usermanagement.controller");
var login_repository_1 = require("../Login API/Login/login.repository");
var login_service_1 = require("../Login API/Login/login.service");
var login_controller_1 = require("../Login API/Login/login.controller");
var servicerequest_model_1 = require("../Admin API/Service Requests/servicerequest.model");
var EditRescheduleSR = servicerequest_model_1.NewServiceRequestSchema.EditRescheduleSR;
var usermanagement_model_1 = require("../Admin API/User Management/usermanagement.model");
var RefundAmount = usermanagement_model_1.UserManagementSchema.RefundAmount;
var router = express_1.default.Router();
var serviceRequestRepo = new servicerequest_repository_1.ServiceRequestRepository();
var serviceRequestService = new servicerequest_service_1.ServiceRequestService(serviceRequestRepo);
var serviceRequestController = new servicerequest_controller_1.ServiceRequestController(serviceRequestService);
var userManagementRepo = new usermanagement_repository_1.UserManagementRepository();
var userManagementService = new usermanagement_service_1.UserManagementService(userManagementRepo);
var userManagementController = new usermanagement_controller_1.UserManagementController(userManagementService);
var loginRepo = new login_repository_1.LoginRepository();
var loginService = new login_service_1.LoginService(loginRepo);
var loginController = new login_controller_1.LoginController(loginService);
// Service Requests
router.get('/service-requests', loginController.validateToken, serviceRequestController.getAllServiceRequests);
router.post('/service-requests/list', loginController.validateToken, serviceRequestController.filteredServiceRequests);
router.get('/cancel-service-request/:requestId', loginController.validateToken, serviceRequestController.cancelServiceRequest);
router.post('/service-request/edit', (0, celebrate_1.celebrate)(EditRescheduleSR), loginController.validateToken, serviceRequestController.editServiceRequest, serviceRequestController.rescheduleServiceRequest);
// User Management
router.get('/users', loginController.validateToken, userManagementController.getAllUsers);
router.put('/active-inactive-user/:userId', loginController.validateToken, userManagementController.activeInactiveUser);
router.post('/refund-amount', 
/*celebrate(RefundAmount),*/
loginController.validateToken, userManagementController.refundAmount);
module.exports = router;
