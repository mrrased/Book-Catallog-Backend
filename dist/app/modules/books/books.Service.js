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
exports.BooksService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const books_Constant_1 = require("./books.Constant");
const CreateBook = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.create({
        data,
        include: {
            category: true,
        },
    });
    return result;
});
const getAllBooks = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { size, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm, minPrice, maxPrice, categoryId } = filters;
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: books_Constant_1.BookSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (minPrice !== undefined || maxPrice !== undefined) {
        // Use optional chaining to conditionally include minPrice and maxPrice filters
        const priceCondition = {};
        if (minPrice !== undefined) {
            priceCondition['gte'] = parseFloat(minPrice);
        }
        if (maxPrice !== undefined) {
            priceCondition['lte'] = parseFloat(maxPrice);
        }
        andConditions.push({
            price: priceCondition,
        });
    }
    if (categoryId !== undefined && categoryId !== '') {
        andConditions.push({
            categoryId: {
                equals: categoryId, // Assuming Prisma schema uses `categoryId` for category filtering
            },
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.book.findMany({
        where: whereConditions,
        skip,
        take: size,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                price: options.sortOrder === 'asc' ? 'asc' : 'desc',
            },
    });
    const total = yield prisma_1.default.book.count({
        where: whereConditions,
    });
    const totalPages = Math.ceil(total / size);
    return {
        meta: {
            total,
            page,
            size,
            totalPages,
        },
        data: result,
    };
});
const getSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.findUnique({
        where: {
            id,
        },
    });
    return result;
});
const getBookByCategory = (categoryId, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { size, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    // const result = await prisma.book.findMany({
    //   where: {
    //     categoryId: categoryId,
    //   },
    // });
    // const andConditions: any[] = [];
    // const whereConditions: Prisma.BookWhereInput =
    //   andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.book.findMany({
        where: {
            categoryId: categoryId,
        },
        skip,
        take: size,
    });
    const total = yield prisma_1.default.book.count({
        where: {
            categoryId: categoryId,
        },
    });
    const totalPages = Math.ceil(total / size);
    return {
        meta: {
            total,
            page,
            size,
            totalPages,
        },
        data: result,
    };
});
const updateBook = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.BooksService = {
    CreateBook,
    getAllBooks,
    getSingleBook,
    updateBook,
    deleteBook,
    getBookByCategory,
};
