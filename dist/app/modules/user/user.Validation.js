"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'name is required',
        }),
        email: zod_1.z.string({
            required_error: 'Email is required',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
        role: zod_1.z.string({
            required_error: 'role is required',
        }),
        contactNo: zod_1.z.string({
            required_error: 'Contact No is required',
        }),
        address: zod_1.z.string({
            required_error: 'Address is required',
        }),
        profileImg: zod_1.z.string({
            required_error: 'Profile Image is required',
        }),
    }),
});
const login = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: 'Email is required',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
    }),
});
const updateUser = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        email: zod_1.z.string().optional(),
        password: zod_1.z.string().optional(),
        role: zod_1.z.string().optional(),
        contactNo: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        profileImg: zod_1.z.string().optional(),
    }),
});
exports.UserValidation = {
    create,
    updateUser,
    login,
};
