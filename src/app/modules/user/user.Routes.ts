import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.Controller';
import { UserValidation } from './user.Validation';

const router = express.Router();

router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUsers);

router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.getSingleUser);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(UserValidation.updateUser),
  UserController.updateUser
);

router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.deleteUser);

export const UserRoutes = router;
