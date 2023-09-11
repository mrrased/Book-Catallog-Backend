import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

const getAllUsers = async () => {
  const result = await prisma.user.findMany();

  return {
    data: result,
  };
};

const getSingleUser = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return result;
};

export const UserService = {
  getAllUsers,
  getSingleUser,
};
