/*
  Warnings:

  - A unique constraint covering the columns `[refresh_token]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `avatar` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refresh_token` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `payment_method` MODIFY `expiration_date` VARCHAR(5) NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `avatar` VARCHAR(120) NOT NULL,
    ADD COLUMN `refresh_token` VARCHAR(240) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `user_refresh_token_key` ON `user`(`refresh_token`);
