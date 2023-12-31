/*
  Warnings:

  - The `status` column on the `order` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'SHIPPED', 'DELIVERED');

-- AlterTable
ALTER TABLE "order" DROP COLUMN "status",
ADD COLUMN     "status" "OrderStatus" DEFAULT 'PENDING';
