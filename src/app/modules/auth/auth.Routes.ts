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

export const AuthRoutes = router;
