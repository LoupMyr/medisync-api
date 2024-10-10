/*
  Warnings:

  - You are about to drop the column `medicamentId` on the `pilulier` table. All the data in the column will be lost.
  - You are about to drop the `medicamentpilulier` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pilulierjour` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `piluliermomentjournee` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `medicamentpilulier` DROP FOREIGN KEY `MedicamentPilulier_medicamentId_fkey`;

-- DropForeignKey
ALTER TABLE `medicamentpilulier` DROP FOREIGN KEY `MedicamentPilulier_pilulierId_fkey`;

-- DropForeignKey
ALTER TABLE `pilulier` DROP FOREIGN KEY `Pilulier_medicamentId_fkey`;

-- DropForeignKey
ALTER TABLE `pilulierjour` DROP FOREIGN KEY `PilulierJour_jour_id_fkey`;

-- DropForeignKey
ALTER TABLE `pilulierjour` DROP FOREIGN KEY `PilulierJour_pilulier_id_fkey`;

-- DropForeignKey
ALTER TABLE `piluliermomentjournee` DROP FOREIGN KEY `PilulierMomentJournee_MomentJournee_id_fkey`;

-- DropForeignKey
ALTER TABLE `piluliermomentjournee` DROP FOREIGN KEY `PilulierMomentJournee_pilulier_id_fkey`;

-- AlterTable
ALTER TABLE `pilulier` DROP COLUMN `medicamentId`;

-- DropTable
DROP TABLE `medicamentpilulier`;

-- DropTable
DROP TABLE `pilulierjour`;

-- DropTable
DROP TABLE `piluliermomentjournee`;

-- CreateTable
CREATE TABLE `MedicamentJourPilulier` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `medicamentId` INTEGER NULL,
    `jour_id` INTEGER NOT NULL,
    `pilulierId` INTEGER NULL,
    `MomentJournee_id` INTEGER NOT NULL,
    `quantite` INTEGER NULL,
    `EstPris` BOOLEAN NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MedicamentJourPilulier` ADD CONSTRAINT `MedicamentJourPilulier_medicamentId_fkey` FOREIGN KEY (`medicamentId`) REFERENCES `Medicament`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MedicamentJourPilulier` ADD CONSTRAINT `MedicamentJourPilulier_jour_id_fkey` FOREIGN KEY (`jour_id`) REFERENCES `Jour`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MedicamentJourPilulier` ADD CONSTRAINT `MedicamentJourPilulier_pilulierId_fkey` FOREIGN KEY (`pilulierId`) REFERENCES `Pilulier`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MedicamentJourPilulier` ADD CONSTRAINT `MedicamentJourPilulier_MomentJournee_id_fkey` FOREIGN KEY (`MomentJournee_id`) REFERENCES `MomentJournee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
