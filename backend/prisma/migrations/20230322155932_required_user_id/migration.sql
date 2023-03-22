/*
  Warnings:

  - Made the column `userId` on table `clients` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `clients` DROP FOREIGN KEY `Clients_userId_fkey`;

-- AlterTable
ALTER TABLE `clients` MODIFY `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Clients` ADD CONSTRAINT `Clients_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
