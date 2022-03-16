"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var servicerequest_repository_1 = require("../Admin API/Service Requests/servicerequest.repository");
var servicerequest_service_1 = require("../Admin API/Service Requests/servicerequest.service");
var servicerequest_controller_1 = require("../Admin API/Service Requests/servicerequest.controller");
var login_repository_1 = require("../Login API/Login/login.repository");
var login_service_1 = require("../Login API/Login/login.service");
var login_controller_1 = require("../Login API/Login/login.controller");
var router = express_1.default.Router();
var serviceRequestRepo = new servicerequest_repository_1.ServiceRequestRepository();
var serviceRequestService = new servicerequest_service_1.ServiceRequestService(serviceRequestRepo);
var serviceRequestController = new servicerequest_controller_1.ServiceRequestController(serviceRequestService);
var loginRepo = new login_repository_1.LoginRepository();
var loginService = new login_service_1.LoginService(loginRepo);
var loginController = new login_controller_1.LoginController(loginService);
// Service Requests
router.get('/service-requests', loginController.validateToken, serviceRequestController.getAllServiceRequests);
router.post('/service-requests/list', loginController.validateToken, serviceRequestController.filteredServiceRequests);
router.get('/cancel-service-request/:requestId', loginController.validateToken, serviceRequestController.cancelServiceRequest);
module.exports = router;
