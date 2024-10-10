const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const CreateMedicament = async (req, res) => {
  const {
    nom,
    dateExpiration,
    description,
    stockDisponible,
    dosage,
    limite,
    forme_pharmacotique,
    avecOrdonnance,
    userId, // The userId to link the medicament with a user
  } = req.body;
  if (
    !nom ||
    !dateExpiration ||
    !description ||
    !stockDisponible ||
    !dosage ||
    !limite ||
    !forme_pharmacotique ||
    typeof avecOrdonnance === "undefined" ||
    !userId
  ) {
    return res
      .status(400)
      .json({ error: "Please provide all required fields" });
  }
  try {
    const newMedicament = await prisma.medicament.create({
      data: {
        nom,
        dateExpiration: new Date(dateExpiration), // Ensure it's a valid DateTime
        description,
        stockDisponible: parseInt(stockDisponible),
        dosage: parseInt(dosage),
        limite: parseInt(limite),
        forme_pharmacotique,
        avecOrdonnance: Boolean(avecOrdonnance),
        userId: parseInt(userId), // Linking the medicament to the user
      },
    });
    res.status(201).json(newMedicament);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Something went wrong while creating the medicament" });
  }
};

module.exports = {
  CreateMedicament,
};
