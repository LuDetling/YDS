/*
  Warnings:

  - You are about to drop the `client` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `client` DROP FOREIGN KEY `Client_userId_fkey`;

-- DropTable
DROP TABLE `client`;

-- CreateTable
CREATE TABLE `Clients` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `workdate` JSON NOT NULL,
    `userId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Clients` ADD CONSTRAINT `Clients_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
