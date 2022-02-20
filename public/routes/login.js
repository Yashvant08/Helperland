"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var celebrate_1 = require("celebrate");
var users_service_1 = require("../Login API/Users/users.service");
var users_controller_1 = require("../Login API/Users/users.controller");
var users_repository_1 = require("../Login API/Users/users.repository");
var users_model_1 = require("../Login API/Users/users.model");
var helpers_model_1 = require("../Login API/ServiceProviders/helpers.model");
var login_model_1 = require("../Login API/Login/login.model");
var resetPassword_model_1 = require("../Login API/ResetPassword/resetPassword.model");
var helpers_service_1 = require("../Login API/ServiceProviders/helpers.service");
var helpers_controller_1 = require("../Login API/ServiceProviders/helpers.controller");
var helpers_repository_1 = require("../Login API/ServiceProviders/helpers.repository");
var login_repository_1 = require("../Login API/Login/login.repository");
var login_service_1 = require("../Login API/Login/login.service");
var login_controller_1 = require("../Login API/Login/login.controller");
var resetPassword_repository_1 = require("../Login API/ResetPassword/resetPassword.repository");
var resetPassword_service_1 = require("../Login API/ResetPassword/resetPassword.service");
var resetPassword_controller_1 = require("../Login API/ResetPassword/resetPassword.controller");
var add = users_model_1.UserSchema.add;
var validate = helpers_model_1.HelperSchema.validate;
var addLogin = login_model_1.LoginSchema.addLogin;
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
/**
 *@swagger
 * definitions:
 *  User:
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
 *    Email:
 *     type: string
 *     description: email of the user
 *     example: 'yashvantdesai7@gmail.com'
 *    Password:
 *     type: string
 *     description: password
 *     example: 'password'
 *    ConfirmPassword:
 *     type: string
 *     description: password
 *     example: 'confirm password'
 *    Mobile:
 *     type: string
 *     description: phone number
 *     example: '7990602480'
 *  Login:
 *   type: object
 *   properties:
 *    Email:
 *     type: string
 *     description: email of the user
 *     example: 'yashvantdesai7@gmail.com'
 *    Password:
 *     type: string
 *     description: password
 *  Reset:
 *   type: object
 *   properties:
 *    Email:
 *     type: string
 *     description: email of the user
 *     example: 'yashvantdesai7@gmail.com'
 *  NewPassword:
 *   type: object
 *   properties:
 *    resetLink:
 *     type: string
 *     description: reset link
 *    newPassword:
 *     type: string
 *     description: new password
 */
// user sign-up routes
/**
 * @swagger
 * /trainee2021/Login-User/userRegistration:
 *  post:
 *   summary: Customer Sign-up
 *   description: user registration
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/User'
 *   responses:
 *    200:
 *     description: Email successfully sent, kindly active your account.
 *    400:
 *     description: password does not match / email or mobile number already registered.
 *    500:
 *     description: failure in registration.
 */
router.post('/userRegistration', (0, celebrate_1.celebrate)(add), userController.createUsers);
router.get('/activate/user/:token', userController.activateAccount);
// service provider sign-up routes
/**
 * @swagger
 * /trainee2021/sp-sign-up:
 *  post:
 *   summary: Become Helper
 *   description: Helper registration
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/User'
 *   responses:
 *    200:
 *     description: Email successfully sent, kindly active your account.
 *    400:
 *     description: password does not match / email or mobile number already registered.
 *    500:
 *     description: failure in registration.
 */
router.post('/sp-sign-up', (0, celebrate_1.celebrate)(validate), helperController.createHelper);
router.get('/activate/helper/:token', helperController.activateAccount);
//Login routes
/**
 * @swagger
 * /trainee2021/login:
 *  post:
 *   summary: User Login
 *   description: Login
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Login'
 *   responses:
 *    200:
 *     description: Login successful.
 *    401:
 *     description: invalid username or password.
 *    500:
 *     description: something went wrong.
 */
router.post('/login', (0, celebrate_1.celebrate)(addLogin), loginController.checkLogin);
router.delete('/logout', loginController.validateToken, loginController.removeToken);
//Forgot password routes
/**
 * @swagger
 * /trainee2021/forgot-password:
 *  post:
 *   summary: forgot Password
 *   description: Enter email
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Reset'
 *   responses:
 *    200:
 *     description: Email successfully sent.
 *    400:
 *     description: User does not exist.
 *    500:
 *     description: something went wrong.
 */
router.post('/forgot-password', (0, celebrate_1.celebrate)(addReset), resetPassController.forgotPassword);
/**
 * @swagger
 * /trainee2021/reset-password:
 *  post:
 *   summary: Reset Password
 *   description: Enter new password
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/NewPassword'
 *   responses:
 *    200:
 *     description: Password successfully changed.
 *    401:
 *     description: Incorrect or expired token.
 *    400:
 *     description: You used that password recently. Choose different password.
 *    500:
 *     description: something went wrong.
 */
router.post('/reset-password', (0, celebrate_1.celebrate)(addPassword), resetPassController.resetPassword);
module.exports = router;
