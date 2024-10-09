-- CreateTable
CREATE TABLE `Pilulier` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quantite` INTEGER NOT NULL,
    `EstPris` BOOLEAN NOT NULL,
    `userId` INTEGER NULL,
    `medicamentId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PilulierJour` (
    `pilulier_id` INTEGER NOT NULL,
    `jour_id` INTEGER NOT NULL,

    PRIMARY KEY (`jour_id`, `pilulier_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PilulierMomentJournee` (
    `pilulier_id` INTEGER NOT NULL,
    `MomentJournee_id` INTEGER NOT NULL,

    PRIMARY KEY (`MomentJournee_id`, `pilulier_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MedicamentPilulier` (
    `medicamentId` INTEGER NOT NULL,
    `pilulierId` INTEGER NOT NULL,

    PRIMARY KEY (`medicamentId`, `pilulierId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Jour` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MomentJournee` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EffetSecondaire` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `medicamentId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pilulier` ADD CONSTRAINT `Pilulier_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pilulier` ADD CONSTRAINT `Pilulier_medicamentId_fkey` FOREIGN KEY (`medicamentId`) REFERENCES `Medicament`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PilulierJour` ADD CONSTRAINT `PilulierJour_pilulier_id_fkey` FOREIGN KEY (`pilulier_id`) REFERENCES `Pilulier`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PilulierJour` ADD CONSTRAINT `PilulierJour_jour_id_fkey` FOREIGN KEY (`jour_id`) REFERENCES `Jour`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PilulierMomentJournee` ADD CONSTRAINT `PilulierMomentJournee_pilulier_id_fkey` FOREIGN KEY (`pilulier_id`) REFERENCES `Pilulier`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PilulierMomentJournee` ADD CONSTRAINT `PilulierMomentJournee_MomentJournee_id_fkey` FOREIGN KEY (`MomentJournee_id`) REFERENCES `MomentJournee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MedicamentPilulier` ADD CONSTRAINT `MedicamentPilulier_medicamentId_fkey` FOREIGN KEY (`medicamentId`) REFERENCES `Medicament`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MedicamentPilulier` ADD CONSTRAINT `MedicamentPilulier_pilulierId_fkey` FOREIGN KEY (`pilulierId`) REFERENCES `Pilulier`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EffetSecondaire` ADD CONSTRAINT `EffetSecondaire_medicamentId_fkey` FOREIGN KEY (`medicamentId`) REFERENCES `Medicament`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
