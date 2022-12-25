/*
  Warnings:

  - You are about to alter the column `A` on the `_gametogenre` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `A` on the `_gametoplatforms` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `A` on the `_gametouser` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `B` on the `_gametouser` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `game_id` on the `bundle_item` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `game` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `game` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `game_id` on the `on_sale` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `userId` on the `payment_method` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `ratings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `ratings` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `game_id` on the `ratings` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `user_id` on the `ratings` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the column `invoice_id` on the `transactions` table. All the data in the column will be lost.
  - You are about to alter the column `game_id` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `user_id` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `password` on the `user` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the `_userfriends` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `hash` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_gametogenre` DROP FOREIGN KEY `_gameTogenre_A_fkey`;

-- DropForeignKey
ALTER TABLE `_gametoplatforms` DROP FOREIGN KEY `_gameToplatforms_A_fkey`;

-- DropForeignKey
ALTER TABLE `_gametouser` DROP FOREIGN KEY `_gameTouser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_gametouser` DROP FOREIGN KEY `_gameTouser_B_fkey`;

-- DropForeignKey
ALTER TABLE `_userfriends` DROP FOREIGN KEY `_UserFriends_A_fkey`;

-- DropForeignKey
ALTER TABLE `_userfriends` DROP FOREIGN KEY `_UserFriends_B_fkey`;

-- DropForeignKey
ALTER TABLE `bundle_item` DROP FOREIGN KEY `bundle_item_game_id_fkey`;

-- DropForeignKey
ALTER TABLE `on_sale` DROP FOREIGN KEY `on_sale_game_id_fkey`;

-- DropForeignKey
ALTER TABLE `payment_method` DROP FOREIGN KEY `payment_method_userId_fkey`;

-- DropForeignKey
ALTER TABLE `ratings` DROP FOREIGN KEY `ratings_game_id_fkey`;

-- DropForeignKey
ALTER TABLE `ratings` DROP FOREIGN KEY `ratings_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `transactions_game_id_fkey`;

-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `transactions_user_id_fkey`;

-- AlterTable
ALTER TABLE `_gametogenre` MODIFY `A` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `_gametoplatforms` MODIFY `A` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `_gametouser` MODIFY `A` INTEGER NOT NULL,
    MODIFY `B` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `bundle_item` MODIFY `game_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `game` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `on_sale` MODIFY `game_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `payment_method` MODIFY `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `ratings` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `game_id` INTEGER NOT NULL,
    MODIFY `user_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `transactions` DROP COLUMN `invoice_id`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `game_id` INTEGER NOT NULL,
    MODIFY `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    DROP COLUMN `password`,
    ADD COLUMN `hash` VARCHAR(120) NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `_userfriends`;

-- CreateTable
CREATE TABLE `friend_list` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `a_id` INTEGER NOT NULL,
    `b_id` INTEGER NOT NULL,
    `accepted` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cart` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `game_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ratings` ADD CONSTRAINT `ratings_game_id_fkey` FOREIGN KEY (`game_id`) REFERENCES `game`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ratings` ADD CONSTRAINT `ratings_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `friend_list` ADD CONSTRAINT `friend_list_a_id_fkey` FOREIGN KEY (`a_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `friend_list` ADD CONSTRAINT `friend_list_b_id_fkey` FOREIGN KEY (`b_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cart` ADD CONSTRAINT `cart_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cart` ADD CONSTRAINT `cart_game_id_fkey` FOREIGN KEY (`game_id`) REFERENCES `game`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bundle_item` ADD CONSTRAINT `bundle_item_game_id_fkey` FOREIGN KEY (`game_id`) REFERENCES `game`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `on_sale` ADD CONSTRAINT `on_sale_game_id_fkey` FOREIGN KEY (`game_id`) REFERENCES `game`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_game_id_fkey` FOREIGN KEY (`game_id`) REFERENCES `game`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payment_method` ADD CONSTRAINT `payment_method_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_gameTogenre` ADD CONSTRAINT `_gameTogenre_A_fkey` FOREIGN KEY (`A`) REFERENCES `game`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_gameToplatforms` ADD CONSTRAINT `_gameToplatforms_A_fkey` FOREIGN KEY (`A`) REFERENCES `game`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_gameTouser` ADD CONSTRAINT `_gameTouser_A_fkey` FOREIGN KEY (`A`) REFERENCES `game`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_gameTouser` ADD CONSTRAINT `_gameTouser_B_fkey` FOREIGN KEY (`B`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
