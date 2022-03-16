import express from "express";
import { celebrate } from "celebrate";


import { ServiceRequestRepository } from "../Admin API/Service Requests/servicerequest.repository";
import { ServiceRequestService } from "../Admin API/Service Requests/servicerequest.service";
import { ServiceRequestController } from "../Admin API/Service Requests/servicerequest.controller";

import { LoginRepository } from "../Login API/Login/login.repository";
import { LoginService } from "../Login API/Login/login.service";
import { LoginController } from "../Login API/Login/login.controller";


const router: express.Router = express.Router();

const serviceRequestRepo: ServiceRequestRepository = new ServiceRequestRepository();
const serviceRequestService: ServiceRequestService = new ServiceRequestService(
serviceRequestRepo);
const serviceRequestController: ServiceRequestController =new ServiceRequestController(serviceRequestService);

const loginRepo: LoginRepository = new LoginRepository();
const loginService: LoginService = new LoginService(loginRepo);
const loginController: LoginController = new LoginController(loginService);


// Service Requests
router.get(
    '/service-requests',
    loginController.validateToken,
    serviceRequestController.getAllServiceRequests
);

router.post(
    '/service-requests/list',
    loginController.validateToken,
    serviceRequestController.filteredServiceRequests
);

router.get(
    '/cancel-service-request/:requestId',
    loginController.validateToken,
    serviceRequestController.cancelServiceRequest
);

export = router;