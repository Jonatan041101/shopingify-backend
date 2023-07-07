/*
  Warnings:

  - Added the required column `status` to the `History` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'COMPLETE', 'CANCELED');

-- AlterTable
ALTER TABLE "History" ADD COLUMN     "status" "Status" NOT NULL;
