/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma } from '@prisma/client';

export type IOrder = {
  userId: any;
  id: string;
  orderedBooks: Prisma.JsonValue;
  status: string;
  createdAt: Date;
};
