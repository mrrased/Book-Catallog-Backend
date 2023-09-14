/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma } from '@prisma/client';

export type IOrder = {
  userId: any;
  id: string;
  orderedBooks: Prisma.JsonArray;
  status: string;
  createdAt: Date;
};
