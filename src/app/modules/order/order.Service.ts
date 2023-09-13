import { Order } from '@prisma/client';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
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

const getSingleOrder = async (
  id: string,
  token: any
): Promise<Order | null> => {
  const verifiedUser = jwtHelpers.verifyToken(
    token,
    config.jwt.secret as Secret
  );

  let result = null;

  if (verifiedUser.role === 'admin') {
    result = await prisma.order.findUnique({
      where: {
        id,
      },
    });
  } else if (verifiedUser.role === 'customer') {
    const findUser = await prisma.order.findUnique({
      where: {
        id,
      },
    });

    if (verifiedUser.userId === findUser?.userId) {
      result = findUser;
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, 'You are not required');
    }
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You are not required');
  }

  // const result = await prisma.order.findUnique({
  //   where: {
  //     id,
  //   },
  // });
  return result;
};

export const OrderService = {
  CreateOrder,
  getAllOrder,
  getSingleOrder,
};
