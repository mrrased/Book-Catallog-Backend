import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from '../user/user.Validation';
import { AuthController } from './auth.Controller';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidation.create),
  AuthController.CreateUser
);

router.post(
  '/signin',
  validateRequest(UserValidation.login),
  AuthController.loginUser
);

export const AuthRoutes = router;
