const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const CreatePilulier = async (req, res) => {
  const {
    nom,
    userId
  } = req.body;
  if (
    !nom ||
    !userId
  ) {
    return res
      .status(400)
      .json({ error: "Please provide all required fields" });
  }
  try {
    const newMedicament = await prisma.pilulier.create({
      data: {
        nom,
        userId: parseInt(userId)
      },
    });
    res.status(201).json(newMedicament);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Something went wrong while creating the pilulier" });
  }
};

module.exports = {
  CreatePilulier,
};
