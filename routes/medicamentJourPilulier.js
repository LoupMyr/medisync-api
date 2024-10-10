const express = require("express");
const router = express.Router();
const { addMedicament, patchEstPris, getMedicamentsByPilulierId } = require("../controllers/MedicamentjourpilulierController.js");

router.post("/", addMedicament);
router.patch("/estPris/:id", patchEstPris);
router.get("/medicaments/:id", getMedicamentsByPilulierId);

module.exports = router;
