import { Category } from '@prisma/client';
import prisma from '../../../shared/prisma';

const CreateCategory = async (data: Category): Promise<Category> => {
  const result = await prisma.category.create({
    data,
  });
  return result;
};

const getAllCategory = async () => {
  const result = await prisma.category.findMany();

  return {
    data: result,
  };
};

const getSingleCategory = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.findUnique({
    where: {
      id,
    },
  });
  return result;
};

export const CategoryService = {
  CreateCategory,
  getAllCategory,
  getSingleCategory,
};
