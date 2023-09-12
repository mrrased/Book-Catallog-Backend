import { Order } from '@prisma/client';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';

const CreateOrder = async (data: Order, token: any): Promise<Order | null> => {
  const verifiedUser = jwtHelpers.verifyToken(
    token,
    config.jwt.secret as Secret
  );

  const result = await prisma.order.create({
    data: {
      ...data,
      userId: verifiedUser.userId,
    },
  });
  return result;
};

const getAllOrder = async (token: any) => {
  const verifiedUser = jwtHelpers.verifyToken(
    token,
    config.jwt.secret as Secret
  );
  console.log(verifiedUser);

  let result = null;

  if (verifiedUser.role === 'admin') {
    result = await prisma.order.findMany();
  } else if (verifiedUser.role === 'customer') {
    result = await prisma.order.findMany({
      where: {
        userId: verifiedUser.userId,
      },
    });
  }

  return {
    data: result,
  };
};

export const OrderService = {
  CreateOrder,
  getAllOrder,
};
