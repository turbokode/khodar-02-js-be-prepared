/*
  Warnings:

  - A unique constraint covering the columns `[device_id]` on the table `subscribers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `province_id` to the `subscribers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "subscribers" ADD COLUMN     "province_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "subscribers_device_id_key" ON "subscribers"("device_id");

-- AddForeignKey
ALTER TABLE "subscribers" ADD CONSTRAINT "subscribers_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "provinces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
