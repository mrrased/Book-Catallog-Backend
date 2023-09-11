import { Category } from '@prisma/client';
import prisma from '../../../shared/prisma';

const CreateCategory = async (data: Category): Promise<Category> => {
  const result = await prisma.category.create({
    data,
  });
  return result;
};

export const CategoryService = {
  CreateCategory,
};
