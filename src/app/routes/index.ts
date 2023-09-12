import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.Routes';
import { BooksRoutes } from '../modules/books/books.Route';
import { CategoryRoutes } from '../modules/category/category.Routes';
import { OrderRoutes } from '../modules/order/order.Route';
import { UserRoutes } from '../modules/user/user.Routes';
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

const router = express.Router();

const moduleRoutes = [
  // ... routes

  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/books',
    route: BooksRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
