import express from 'express';
import { CategoryController } from './category.Controller';

const router = express.Router();

router.post('/create-category', CategoryController.createCategory);

export const CategoryRoutes = router;
