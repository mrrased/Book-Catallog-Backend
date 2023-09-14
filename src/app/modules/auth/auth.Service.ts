import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import { ICreateUser, IUser } from './auth.Interface';

const CreateUser = async (data: User): Promise<ICreateUser> => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const result = await prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });

  // Omit the password from the returned user object for security
  // const userWithoutPassword = { ...result, password: undefined };
  return result;
};

const loginUser = async (payload: User): Promise<IUser> => {
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  console.log(user);

  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User does not exist');
  }

  // Compare the provided password with the hashed password in the database
  const passwordMatch = await bcrypt.compare(payload.password, user.password);

  if (!passwordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  // Create a JWT token
  // const token = jwtHelpers.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
  const { role, id: userId } = user;
  const token = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  // const refreshToken = jwtHelpers.createToken(
  //   { userId, role },
  //   config.jwt.refresh_secret as Secret,
  //   config.jwt.refresh_expires_in as string
  // );

  return {
    token,
  };
};

export const AuthService = {
  CreateUser,
  loginUser,
};
