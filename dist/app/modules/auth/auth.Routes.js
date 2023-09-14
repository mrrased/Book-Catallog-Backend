"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_Validation_1 = require("../user/user.Validation");
const auth_Controller_1 = require("./auth.Controller");
const router = express_1.default.Router();
router.post('/signup', (0, validateRequest_1.default)(user_Validation_1.UserValidation.create), auth_Controller_1.AuthController.CreateUser);
router.post('/signin', (0, validateRequest_1.default)(user_Validation_1.UserValidation.login), auth_Controller_1.AuthController.loginUser);
exports.AuthRoutes = router;
