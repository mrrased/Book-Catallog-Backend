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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const CreateUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt_1.default.hash(data.password, 10);
    const result = yield prisma_1.default.user.create({
        data: Object.assign(Object.assign({}, data), { password: hashedPassword }),
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            contactNo: true,
            address: true,
            profileImg: true,
        },
    });
    // Omit the password from the returned user object for security
    // const userWithoutPassword = { ...result, password: undefined };
    return result;
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUnique({
        where: {
            email: payload.email,
        },
    });
    console.log(user);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'User does not exist');
    }
    // Compare the provided password with the hashed password in the database
    const passwordMatch = yield bcrypt_1.default.compare(payload.password, user.password);
    if (!passwordMatch) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is incorrect');
    }
    // Create a JWT token
    // const token = jwtHelpers.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
    const { role, id: userId } = user;
    const token = jwtHelpers_1.jwtHelpers.createToken({ userId, role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    // const refreshToken = jwtHelpers.createToken(
    //   { userId, role },
    //   config.jwt.refresh_secret as Secret,
    //   config.jwt.refresh_expires_in as string
    // );
    return {
        token,
    };
});
exports.AuthService = {
    CreateUser,
    loginUser,
};
