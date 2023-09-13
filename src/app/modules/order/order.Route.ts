import express from 'express';
import { OrderController } from './order.Controller';

const router = express.Router();

router.post('/create-order', OrderController.createOrder);

router.get('/', OrderController.getAllOrder);

router.get('/:id', OrderController.getSingleOrder);

// router.patch(
//   '/:id',
//   validateRequest(UserValidation.updateUser),
//   UserController.updateUser
// );

// router.delete('/:id', UserController.deleteUser);

export const OrderRoutes = router;
