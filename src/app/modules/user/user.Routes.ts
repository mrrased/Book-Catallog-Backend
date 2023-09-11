import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.Controller';
import { UserValidation } from './user.Validation';

const router = express.Router();

router.get('/', UserController.getAllUsers);

router.get('/:id', UserController.getSingleUser);

router.patch(
  '/:id',
  validateRequest(UserValidation.updateUser),
  UserController.updateUser
);

router.delete('/:id', UserController.deleteUser);

export const UserRoutes = router;
