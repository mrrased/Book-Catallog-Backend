import express from 'express';
import { BooksController } from './books.Controller';

const router = express.Router();

router.post('/create-book', BooksController.createBook);

router.get('/', BooksController.getAllBooks);

router.get('/:id', BooksController.getSingleBook);

router.get('/:id/category', BooksController.getBookByCategory);

router.patch('/:id', BooksController.updateBook);

router.delete('/:id', BooksController.deleteBook);

export const BooksRoutes = router;
