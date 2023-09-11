import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

const CreateUser = async (data: User): Promise<User> => {
  const result = await prisma.user.create({
    data,
  });
  return result;
};

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
  CreateUser,
  getAllUsers,
  getSingleUser,
};
