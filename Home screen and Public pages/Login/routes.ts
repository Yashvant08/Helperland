import express from 'express';
import { celebrate } from 'celebrate';
import {UsersService} from './Users/users.service';
import {UsersController} from './Users/users.controller';
import {UsersRepository} from './Users/users.repository';
import { UserSchema } from './Users/users.model';
import { HelperSchema } from './ServiceProviders/helpers.model';
import { LoginSchema } from './Login/login.model';
import {ResetSchema} from './ResetPassword/resetPassword.model';
import {HelpersService} from './ServiceProviders/helpers.service';
import {HelpersController} from './ServiceProviders/helpers.controller';
import {HelpersRepository} from './ServiceProviders/helpers.repository';
import { LoginRepository } from './Login/login.repository';
import { LoginService } from './Login/login.service';
import { LoginController} from './Login/login.controller';
import { ResetRepository } from './ResetPassword/resetPassword.repository';
import { ResetService } from './ResetPassword/resetPassword.service';
import { ResetController } from './ResetPassword/resetPassword.controller';


const {add} = UserSchema;
const {validate} = HelperSchema;
const {addLogin} = LoginSchema;
const {addReset, addPassword} = ResetSchema;


const router:express.Router = express.Router();


const userRepo:UsersRepository = new UsersRepository();
const userService:UsersService = new UsersService(userRepo);
const userController:UsersController = new UsersController(userService);

const helperRepo:HelpersRepository = new HelpersRepository();
const helperService:HelpersService = new HelpersService(helperRepo);
const helperController:HelpersController = new HelpersController(helperService);

const loginRepo:LoginRepository = new LoginRepository();
const loginService:LoginService = new LoginService(loginRepo);
const loginController:LoginController = new LoginController(loginService);

const resetPassRepo:ResetRepository = new ResetRepository();
const resetPassService:ResetService = new ResetService(resetPassRepo);
const resetPassController:ResetController = new ResetController(resetPassService);

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
 * /trainee2021/userRegistration:
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
router.post('/userRegistration', celebrate(add), userController.createUsers);
router.get('/activate/user/:token',userController.activateAccount);


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
router.post('/sp-sign-up', celebrate(validate),helperController.createHelper);
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
router.post('/login',celebrate(addLogin),loginController.checkLogin);
router.post('/validate',loginController.validateToken);
router.delete('/logout',loginController.validateToken,loginController.removeToken);

//Forgot password routes

/**
 * @swagger
 * /trainee2021/forgot-password:
 *  post:
 *   summary: Reset Password
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
router.post('/forgot-password', celebrate(addReset),resetPassController.forgotPassword);
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
router.post('/reset-password',celebrate(addPassword),resetPassController.resetPassword);

export = router;