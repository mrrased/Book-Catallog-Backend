import express from 'express';
import { CategoryController } from './category.Controller';

const router = express.Router();

router.post('/create-category', CategoryController.createCategory);

router.get('/', CategoryController.getAllCategory);

router.get('/:id', CategoryController.getSingleCategory);

router.patch('/:id', CategoryController.updateCategory);

export const CategoryRoutes = router;
