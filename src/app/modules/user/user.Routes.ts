import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.Controller';
import { UserValidation } from './user.Validation';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidation.create),
  UserController.CreateUser
);

router.get('/users', UserController.getAllUsers);

router.get('/:id', UserController.getSingleUser);

export const UserRoutes = router;
