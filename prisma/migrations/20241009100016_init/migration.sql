-- CreateTable
CREATE TABLE `Medicament` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `dateExpiration` DATETIME(3) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `stockDisponible` INTEGER NOT NULL,
    `dosage` INTEGER NOT NULL,
    `forme_pharmacotique` VARCHAR(191) NOT NULL,
    `avecOrdonnance` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
