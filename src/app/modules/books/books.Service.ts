/* eslint-disable @typescript-eslint/no-explicit-any */
import { Book, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { BookSearchableFields } from './books.Constant';
import { IBooksFilterRequest } from './books.Interface';

const CreateBook = async (data: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data,
    include: {
      category: true,
    },
  });
  return result;
};

const getAllBooks = async (
  filters: Partial<IBooksFilterRequest>,
  options: IPaginationOptions
) => {
  const { size, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, minPrice, maxPrice, categoryId } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: BookSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    // Use optional chaining to conditionally include minPrice and maxPrice filters
    const priceCondition: {
      gte?: number | undefined;
      lte?: number | undefined;
    } = {};
    if (minPrice !== undefined) {
      priceCondition['gte'] = parseFloat(minPrice);
    }
    if (maxPrice !== undefined) {
      priceCondition['lte'] = parseFloat(maxPrice);
    }
    andConditions.push({
      price: priceCondition,
    });
  }

  if (categoryId !== undefined && categoryId !== '') {
    andConditions.push({
      categoryId: {
        equals: categoryId, // Assuming Prisma schema uses `categoryId` for category filtering
      },
    });
  }

  const whereConditions: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.book.findMany({
    where: whereConditions,
    skip,
    take: size,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            price: options.sortOrder === 'asc' ? 'asc' : 'desc',
          },
  });

  const total = await prisma.book.count({
    where: whereConditions,
  });

  const totalPages = Math.ceil(total / size);

  return {
    meta: {
      total,
      page,
      size,
      totalPages,
    },
    data: result,
  };
};

const getSingleBook = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const getBookByCategory = async (
  categoryId: string,
  options: IPaginationOptions
) => {
  const { size, page, skip } = paginationHelpers.calculatePagination(options);

  // const result = await prisma.book.findMany({
  //   where: {
  //     categoryId: categoryId,
  //   },
  // });

  // const andConditions: any[] = [];

  // const whereConditions: Prisma.BookWhereInput =
  //   andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.book.findMany({
    where: {
      categoryId: categoryId,
    },
    skip,
    take: size,
  });

  const total = await prisma.book.count({
    where: {
      categoryId: categoryId,
    },
  });

  const totalPages = Math.ceil(total / size);

  return {
    meta: {
      total,
      page,
      size,
      totalPages,
    },
    data: result,
  };
};

const updateBook = async (
  id: string,
  payload: Partial<Book>
): Promise<Book> => {
  const result = await prisma.book.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteBook = async (id: string): Promise<Book> => {
  const result = await prisma.book.delete({
    where: {
      id,
    },
  });
  return result;
};

export const BooksService = {
  CreateBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
  getBookByCategory,
};
