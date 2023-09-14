import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { BooksController } from './books.Controller';

const router = express.Router();

router.post(
  '/create-book',
  auth(ENUM_USER_ROLE.ADMIN),
  BooksController.createBook
);

router.get('/', BooksController.getAllBooks);

router.get('/:id', BooksController.getSingleBook);

router.get('/:id/category', BooksController.getBookByCategory);

router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), BooksController.updateBook);

router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), BooksController.deleteBook);

export const BooksRoutes = router;
