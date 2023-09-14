"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const books_Controller_1 = require("./books.Controller");
const router = express_1.default.Router();
router.post('/create-book', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), books_Controller_1.BooksController.createBook);
router.get('/', books_Controller_1.BooksController.getAllBooks);
router.get('/:id', books_Controller_1.BooksController.getSingleBook);
router.get('/:id/category', books_Controller_1.BooksController.getBookByCategory);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), books_Controller_1.BooksController.updateBook);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), books_Controller_1.BooksController.deleteBook);
exports.BooksRoutes = router;
