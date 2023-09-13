import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import { IUser } from './profile.Interface';

const getProfile = async (token: any): Promise<IUser | null> => {
  const verifiedUser = jwtHelpers.verifyToken(
    token,
    config.jwt.secret as Secret
  );
  console.log(verifiedUser);

  const result = await prisma.user.findUnique({
    where: {
      id: verifiedUser.userId,
    },
  });
  const { password, id, createdAt, updatedAt, ...data } = result;

  return data;
};

export const ProfileService = {
  getProfile,
};
