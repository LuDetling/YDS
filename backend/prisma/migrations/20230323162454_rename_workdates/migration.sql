/*
  Warnings:

  - You are about to drop the column `workdate` on the `clients` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `clients` DROP COLUMN `workdate`,
    ADD COLUMN `workdates` JSON NULL;
