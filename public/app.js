"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var models_1 = require("./models");
var multer_1 = __importDefault(require("multer"));
var swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var bookservice_1 = __importDefault(require("./routes/bookservice"));
var contactus_1 = __importDefault(require("./routes/contactus"));
var login_1 = __importDefault(require("./routes/login"));
var customer_1 = __importDefault(require("./routes/customer"));
var serviceprovider_1 = __importDefault(require("./routes/serviceprovider"));
var admin_1 = __importDefault(require("./routes/admin"));
// import Yaml from "yamljs"
require('dotenv').config();
var app = (0, express_1.default)();
// const swaggerDc = Yaml.load('./apiList.yaml');
var swaggerOption = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Helperland API',
            version: '1.0.0',
            description: 'Simple Helperland API',
            contact: {
                name: 'Yashvantray Desai',
                email: 'yashvantdesai7@gmail.com'
            },
            servers: [
                {
                    url: "http://localhost:3000"
                }
            ]
        }
    },
    apis: ["./routes/contactus.ts", "./routes/login.ts", "./routes/bookservice.ts", "./routes/customer.ts", "./routes/serviceprovider.ts", "./routes/admin.ts"]
};
var swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOption);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, multer_1.default)({ dest: 'uploadFiles' }).single('file'));
app.use('/trainee2021/contact-us', contactus_1.default);
app.use('/trainee2021/Login-User', login_1.default);
app.use('/trainee2021/bookservice', bookservice_1.default);
app.use('/trainee2021/customer', customer_1.default);
app.use('/trainee2021/serviceprovider', serviceprovider_1.default);
app.use('/trainee2021/admin', admin_1.default);
app.listen(process.env.PORT, function () {
    console.log("Server starting at ".concat(process.env.PORT));
    models_1.sequelize.authenticate().then(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log("database connected");
            return [2 /*return*/];
        });
    }); }).catch(function (e) {
        console.log(e.message);
    });
});
