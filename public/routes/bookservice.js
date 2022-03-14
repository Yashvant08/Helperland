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
//Service Request routes
router.post('/postalcode-check', (0, celebrate_1.celebrate)(zipcode), loginController.validateToken, controller.checkAvailibility);
router.post('/CreateRequest', (0, celebrate_1.celebrate)(createService), loginController.validateToken, controller.decodeToken, controller.CreateServiceRequest);
//User routes
router.post('/UserAddress', (0, celebrate_1.celebrate)(userAddress), loginController.validateToken, controller.createUserAddress);
router.get('/UserAddresses', loginController.validateToken, controller.getUserAddresses);
router.post('/createfb', loginController.validateToken, controller.createFavoriteAndBlocked);
router.get('/createfb', loginController.validateToken, controller.getFavoriteAndBlocked);
module.exports = router;
