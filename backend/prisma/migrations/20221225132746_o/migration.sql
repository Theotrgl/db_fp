/*
  Warnings:

  - You are about to alter the column `B` on the `_gametogenre` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(20)`.
  - The primary key for the `genre` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `genre` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `_gametogenre` DROP FOREIGN KEY `_gameTogenre_B_fkey`;

-- AlterTable
ALTER TABLE `_gametogenre` MODIFY `B` VARCHAR(20) NOT NULL;

-- AlterTable
ALTER TABLE `genre` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`name`);

-- AddForeignKey
ALTER TABLE `_gameTogenre` ADD CONSTRAINT `_gameTogenre_B_fkey` FOREIGN KEY (`B`) REFERENCES `genre`(`name`) ON DELETE CASCADE ON UPDATE CASCADE;
