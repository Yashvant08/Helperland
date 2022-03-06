"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var celebrate_1 = require("celebrate");
var dashboard_repository_1 = require("../Customer API/Dashboard/dashboard.repository");
var dashboard_service_1 = require("../Customer API/Dashboard/dashboard.service");
var dashboard_controller_1 = require("../Customer API/Dashboard/dashboard.controller");
var servicehistory_repository_1 = require("../Customer API/Service History/servicehistory.repository");
var servicehistory_service_1 = require("../Customer API/Service History/servicehistory.service");
var servicehistory_controller_1 = require("../Customer API/Service History/servicehistory.controller");
var favorite_pros_repository_1 = require("../Customer API/Favorite Pros/favorite-pros.repository");
var favorite_pros_service_1 = require("../Customer API/Favorite Pros/favorite-pros.service");
var favorite_pros_controller_1 = require("../Customer API/Favorite Pros/favorite-pros.controller");
var mysettings_repository_1 = require("../Customer API/My Settings/mysettings.repository");
var mysettings_service_1 = require("../Customer API/My Settings/mysettings.service");
var mysettings_controller_1 = require("../Customer API/My Settings/mysettings.controller");
var login_repository_1 = require("../Login API/Login/login.repository");
var login_service_1 = require("../Login API/Login/login.service");
var login_controller_1 = require("../Login API/Login/login.controller");
//Validation models
var dashboard_model_1 = require("../Customer API/Dashboard/dashboard.model");
var RescheduleSR = dashboard_model_1.DashboardSchema.RescheduleSR, CancelSR = dashboard_model_1.DashboardSchema.CancelSR, GetDashboard = dashboard_model_1.DashboardSchema.GetDashboard;
var servicehistory_model_1 = require("../Customer API/Service History/servicehistory.model");
var Ratings = servicehistory_model_1.ServiceHistorySchema.Ratings;
var favorite_pros_model_1 = require("../Customer API/Favorite Pros/favorite-pros.model");
var Favorite = favorite_pros_model_1.FavoriteProsSchema.Favorite, Blocked = favorite_pros_model_1.FavoriteProsSchema.Blocked;
var mysettings_model_1 = require("../Customer API/My Settings/mysettings.model");
var UpdateUser = mysettings_model_1.MySettingsSchema.UpdateUser, UpdateCreateUserAddress = mysettings_model_1.MySettingsSchema.UpdateCreateUserAddress, ChangePassword = mysettings_model_1.MySettingsSchema.ChangePassword;
var router = express_1.default.Router();
var dashboardRepo = new dashboard_repository_1.DashboardRepository();
var dashboardService = new dashboard_service_1.DashboardService(dashboardRepo);
var dashboardController = new dashboard_controller_1.DashboardController(dashboardService);
var serviceHistoryRepo = new servicehistory_repository_1.ServiceHistoryRepository();
var serviceHistoryService = new servicehistory_service_1.ServiceHistoryService(serviceHistoryRepo);
var serviceHistoryController = new servicehistory_controller_1.ServiceHistoryController(serviceHistoryService);
var favoriteProsRepo = new favorite_pros_repository_1.FavoriteProsRepository();
var favoriteProsService = new favorite_pros_service_1.FavoriteProsService(favoriteProsRepo);
var favoriteProsController = new favorite_pros_controller_1.FavoriteProsController(favoriteProsService);
var mySettingsRepo = new mysettings_repository_1.MySettingsRepository();
var mySettingsService = new mysettings_service_1.MySettingsService(mySettingsRepo);
var mySettingsController = new mysettings_controller_1.MySettingsController(mySettingsService);
var loginRepo = new login_repository_1.LoginRepository();
var loginService = new login_service_1.LoginService(loginRepo);
var loginController = new login_controller_1.LoginController(loginService);
// Customer's Routes
//Dashboard routes
router.get("/dashboard", loginController.validateToken, dashboardController.getServiceRequest);
router.get("/dashboard/detail/:id", (0, celebrate_1.celebrate)(GetDashboard), loginController.validateToken, dashboardController.getServiceRequestDetailById);
router.post("/rescheduleService/:serviceId", (0, celebrate_1.celebrate)(RescheduleSR), loginController.validateToken, dashboardController.rescheduleService, dashboardController.rescheduleIfTimeSlotNotConflicts);
router.post("/CancelServiceRequest/:srId", (0, celebrate_1.celebrate)(CancelSR), loginController.validateToken, dashboardController.cancelServiceRequest);
//Service history routes
router.get("/service-history", loginController.validateToken, serviceHistoryController.getCancelledOrCompletedSR);
router.get("/service-history/:id", loginController.validateToken, serviceHistoryController.getServiceRequestDetailById);
router.post("/rating/:serviceId", (0, celebrate_1.celebrate)(Ratings), loginController.validateToken, serviceHistoryController.rateServiceProvider);
//Favorite And Blocked routes
router.get("/favorite-pros", loginController.validateToken, favoriteProsController.getAllHelperWorkedWithCustomer);
router.post("/favorite-pros/:helperId", (0, celebrate_1.celebrate)(Favorite), loginController.validateToken, favoriteProsController.createFavoriteHelper, favoriteProsController.removeFavoriteHelper);
router.post("/block-pros/:helperId", (0, celebrate_1.celebrate)(Blocked), loginController.validateToken, favoriteProsController.blockHelper, favoriteProsController.removeBlockedHelper);
//My Settings routes
//-My details
router.get("/my-details", loginController.validateToken, mySettingsController.getUserDetailById);
router.put("/my-details", (0, celebrate_1.celebrate)(UpdateUser), loginController.validateToken, mySettingsController.updateUserDetailById);
//-My Address
router.get("/my-address", loginController.validateToken, mySettingsController.getUserAddressesByUserId);
router.get("/my-address/:addressId", loginController.validateToken, mySettingsController.getUserAddressByAddressId);
router.put("/my-address/:addressId", (0, celebrate_1.celebrate)(UpdateCreateUserAddress), loginController.validateToken, mySettingsController.updateUserAddressByAddressId);
router.post("/my-address", (0, celebrate_1.celebrate)(UpdateCreateUserAddress), loginController.validateToken, mySettingsController.createUserAddress);
router.put("/my-address/deleteAddress/:addressId", loginController.validateToken, mySettingsController.deleteUserAddressByAddressId);
//Change Password
router.put("/changePassword", (0, celebrate_1.celebrate)(ChangePassword), loginController.validateToken, mySettingsController.changeUserPassword);
module.exports = router;
