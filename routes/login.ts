import express from 'express';
import { celebrate } from 'celebrate';

import {UsersService} from '../Login API/Users/users.service';
import {UsersController} from '../Login API/Users/users.controller';
import {UsersRepository} from '../Login API/Users/users.repository';

import {HelpersService} from '../Login API/ServiceProviders/helpers.service';
import {HelpersController} from '../Login API/ServiceProviders/helpers.controller';
import {HelpersRepository} from '../Login API/ServiceProviders/helpers.repository';

import { LoginRepository } from '../Login API/Login/login.repository';
import { LoginService } from '../Login API/Login/login.service';
import { LoginController} from '../Login API/Login/login.controller';

import { ResetRepository } from '../Login API/ResetPassword/resetPassword.repository';
import { ResetService } from '../Login API/ResetPassword/resetPassword.service';
import { ResetController } from '../Login API/ResetPassword/resetPassword.controller';

import { UserSchema } from '../Login API/Users/users.model';
const {add} = UserSchema;

import { HelperSchema } from '../Login API/ServiceProviders/helpers.model';
const {validate} = HelperSchema;

import { LoginSchema } from '../Login API/Login/login.model';
const {addLogin} = LoginSchema;

import {ResetSchema} from '../Login API/ResetPassword/resetPassword.model';
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
router.post('/userRegistration', celebrate(add), userController.createUsers);
router.get('/activate/user/:token',userController.activateAccount);


// service provider sign-up routes

/**
 * @swagger
 * /trainee2021/Login-User/sp-sign-up:
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
 * /trainee2021/Login-User/login:
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
 *     cookie:
 *      token:
 *       schema:
 *        type: string
 *    401:
 *     description: invalid username or password.
 *    500:
 *     description: something went wrong.
 */
router.post('/login',celebrate(addLogin),loginController.checkLogin);
/**
 * @swagger
 * /trainee2021/Login-User/logout:
 *  delete:
 *   summary: User Logout
 *   description: Logout
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: Logout successful.
 *    500:
 *     description: something went wrong.
 */
router.delete('/logout',loginController.validateToken,loginController.removeToken);

//Forgot password routes

/**
 * @swagger
 * /trainee2021/Login-User/forgot-password:
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
router.post('/forgot-password', celebrate(addReset),resetPassController.forgotPassword);
/**
 * @swagger
 * /trainee2021/Login-User/reset-password:
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