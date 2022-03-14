"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var celebrate_1 = require("celebrate");
var users_service_1 = require("../Login API/Users/users.service");
var users_controller_1 = require("../Login API/Users/users.controller");
var users_repository_1 = require("../Login API/Users/users.repository");
var helpers_service_1 = require("../Login API/ServiceProviders/helpers.service");
var helpers_controller_1 = require("../Login API/ServiceProviders/helpers.controller");
var helpers_repository_1 = require("../Login API/ServiceProviders/helpers.repository");
var login_repository_1 = require("../Login API/Login/login.repository");
var login_service_1 = require("../Login API/Login/login.service");
var login_controller_1 = require("../Login API/Login/login.controller");
var resetPassword_repository_1 = require("../Login API/ResetPassword/resetPassword.repository");
var resetPassword_service_1 = require("../Login API/ResetPassword/resetPassword.service");
var resetPassword_controller_1 = require("../Login API/ResetPassword/resetPassword.controller");
var users_model_1 = require("../Login API/Users/users.model");
var add = users_model_1.UserSchema.add;
var helpers_model_1 = require("../Login API/ServiceProviders/helpers.model");
var validate = helpers_model_1.HelperSchema.validate;
var login_model_1 = require("../Login API/Login/login.model");
var addLogin = login_model_1.LoginSchema.addLogin;
var resetPassword_model_1 = require("../Login API/ResetPassword/resetPassword.model");
var addReset = resetPassword_model_1.ResetSchema.addReset, addPassword = resetPassword_model_1.ResetSchema.addPassword;
var router = express_1.default.Router();
var userRepo = new users_repository_1.UsersRepository();
var userService = new users_service_1.UsersService(userRepo);
var userController = new users_controller_1.UsersController(userService);
var helperRepo = new helpers_repository_1.HelpersRepository();
var helperService = new helpers_service_1.HelpersService(helperRepo);
var helperController = new helpers_controller_1.HelpersController(helperService);
var loginRepo = new login_repository_1.LoginRepository();
var loginService = new login_service_1.LoginService(loginRepo);
var loginController = new login_controller_1.LoginController(loginService);
var resetPassRepo = new resetPassword_repository_1.ResetRepository();
var resetPassService = new resetPassword_service_1.ResetService(resetPassRepo);
var resetPassController = new resetPassword_controller_1.ResetController(resetPassService);
// user sign-up routes
router.post('/userRegistration', (0, celebrate_1.celebrate)(add), userController.createUsers);
router.get('/activate/user/:token', userController.activateAccount);
// service provider sign-up routes
router.post('/sp-sign-up', (0, celebrate_1.celebrate)(validate), helperController.createHelper);
router.get('/activate/helper/:token', helperController.activateAccount);
//Login routes
router.post('/login', (0, celebrate_1.celebrate)(addLogin), loginController.checkLogin);
router.delete('/logout', loginController.validateToken, loginController.removeToken);
//Forgot password routes
router.post('/forgot-password', (0, celebrate_1.celebrate)(addReset), resetPassController.forgotPassword);
router.post('/reset-password', (0, celebrate_1.celebrate)(addPassword), resetPassController.resetPassword);
module.exports = router;
