/* eslint-disable @typescript-eslint/no-explicit-any */
import { Order } from '@prisma/client';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import { IOrder } from './order.Interface';

const CreateOrder = async (data: IOrder, token: any): Promise<Order | null> => {
  const verifiedUser = jwtHelpers.verifyToken(
    token,
    config.jwt.secret as Secret
  );

  const orderedBooksData: Record<string, any> = {};

  if (data.orderedBooks) {
    for (let i = 0; i < data.orderedBooks.length; i++) {
      const book = data.orderedBooks[i];
      orderedBooksData[`book${i + 1}`] = book;
    }
  }

  const result = await prisma.order.create({
    data: {
      ...data,
      userId: verifiedUser.userId,
      orderedBooks: orderedBooksData,
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
  } else {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You Are Not Authorized');
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
