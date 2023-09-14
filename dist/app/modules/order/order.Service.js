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
exports.OrderService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const CreateOrder = (data, token) => __awaiter(void 0, void 0, void 0, function* () {
    const verifiedUser = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    const orderedBooksData = {};
    if (data.orderedBooks) {
        for (let i = 0; i < data.orderedBooks.length; i++) {
            const book = data.orderedBooks[i];
            orderedBooksData[`book${i + 1}`] = book;
        }
    }
    const result = yield prisma_1.default.order.create({
        data: Object.assign(Object.assign({}, data), { userId: verifiedUser.userId, orderedBooks: orderedBooksData }),
    });
    return result;
});
const getAllOrder = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const verifiedUser = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    let result = null;
    if (verifiedUser.role === 'admin') {
        result = yield prisma_1.default.order.findMany();
    }
    else if (verifiedUser.role === 'customer') {
        result = yield prisma_1.default.order.findMany({
            where: {
                userId: verifiedUser.userId,
            },
        });
    }
    else {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'You Are Not Authorized');
    }
    return {
        data: result,
    };
});
const getSingleOrder = (id, token) => __awaiter(void 0, void 0, void 0, function* () {
    const verifiedUser = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    let result = null;
    if (verifiedUser.role === 'admin') {
        result = yield prisma_1.default.order.findUnique({
            where: {
                id,
            },
        });
    }
    else if (verifiedUser.role === 'customer') {
        const findUser = yield prisma_1.default.order.findUnique({
            where: {
                id,
            },
        });
        if (verifiedUser.userId === (findUser === null || findUser === void 0 ? void 0 : findUser.userId)) {
            result = findUser;
        }
        else {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'You are not required');
        }
    }
    else {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'You are not required');
    }
    // const result = await prisma.order.findUnique({
    //   where: {
    //     id,
    //   },
    // });
    return result;
});
exports.OrderService = {
    CreateOrder,
    getAllOrder,
    getSingleOrder,
};
