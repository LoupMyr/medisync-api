const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const addMedicament = async (req, res) => {
  const {
    medicamentId,
    jourId,
    pilulierId,
    momentJourneeId,
    quantite,
    userId,
  } = req.body;
  if (
    !medicamentId ||
    !jourId ||
    !pilulierId ||
    !momentJourneeId ||
    !quantite ||
    !userId
  ) {
    return res
      .status(400)
      .json({ error: "Please provide all required fields" });
  }
  try {
    const newJourMedic = await prisma.medicamentJourPilulier.create({
      data: {
        medicamentId,
        jour_id: jourId,
        pilulierId,
        MomentJournee_id: momentJourneeId,
        quantite,
        EstPris: false,
      },
    });
    res.status(201).json(newJourMedic);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Something went wrong while adding medicaments" });
  }
};

const patchEstPris = async (req, res) => {
  const { id } = req.params;
  const { estPris } = req.body;
  if (estPris === undefined) {
    return res
      .status(400)
      .json({ error: "Please provide all required fields" });
  }
  const elt = await prisma.medicamentJourPilulier.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!elt) {
    res.status(404).json({ error: "No element found." });
  }
  try {
    const updateElt = await prisma.medicamentJourPilulier.update({
      where: {
        id: parseInt(id),
      },
      data: {
        EstPris: estPris === "true",
      },
    });
    res.status(201).json(updateElt);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Something went wrong while updating data." });
  }
};

const getMedicamentsByPilulierId = async (req, res) => {
  const { id } = req.params;
  const elements = await prisma.medicamentJourPilulier.findMany({
    where: {
      pilulierId: parseInt(id),
    },
  });
  var result = [];
  for (const elt of elements) {
    const medicament = await prisma.medicament.findUnique({
      where: { id: elt.medicamentId },
    });
    result.push({id: elt.id, quantite: elt.quantite, estPris: elt.EstPris, medicament: medicament, journee: elt.jour_id, momentJournee: elt.MomentJournee_id});
  }
  res.status(200).json(result);
};

module.exports = {
  addMedicament,
  patchEstPris,
  getMedicamentsByPilulierId,
};
