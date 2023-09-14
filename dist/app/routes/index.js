"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_Routes_1 = require("../modules/auth/auth.Routes");
const books_Route_1 = require("../modules/books/books.Route");
const category_Routes_1 = require("../modules/category/category.Routes");
const order_Route_1 = require("../modules/order/order.Route");
const profile_Route_1 = require("../modules/profile/profile.Route");
const user_Routes_1 = require("../modules/user/user.Routes");
// import { academicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.routes';
// import { academicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.routes';
// import { AcademicSemeterRoutes } from '../modules/academicSemester/academicSemester.routes';
// import { buildingRoutes } from '../modules/building/building.routes';
// import { courseRoutes } from '../modules/course/course.routes';
// import { facultyRoutes } from '../modules/faculty/faculty.routes';
// import { offeredCourseRoutes } from '../modules/offeredCourse/offeredCourse.routes';
// import { offeredCourseClassScheduleRoutes } from '../modules/offeredCourseClassSchedule/offeredCourseClassSchedule.routes';
// import { offeredCourseSectionRoutes } from '../modules/offeredCourseSection/offeredCourseSection.routes';
// import { roomRoutes } from '../modules/room/room.routes';
// import { semesterRegistrationRoutes } from '../modules/semesterRegistration/semesterRegistration.routes';
// import { studentRoutes } from '../modules/student/student.routes';
// import { studentEnrolledCourseMarkRoutes } from '../modules/studentEnrolledCourseMark/studentEnrolledCourseMark.routes';
const router = express_1.default.Router();
const moduleRoutes = [
    // ... routes
    {
        path: '/auth',
        route: auth_Routes_1.AuthRoutes,
    },
    {
        path: '/users',
        route: user_Routes_1.UserRoutes,
    },
    {
        path: '/categories',
        route: category_Routes_1.CategoryRoutes,
    },
    {
        path: '/books',
        route: books_Route_1.BooksRoutes,
    },
    {
        path: '/orders',
        route: order_Route_1.OrderRoutes,
    },
    {
        path: '/profile',
        route: profile_Route_1.ProfileRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
