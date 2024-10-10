const express = require("express");
const router = express.Router();
const { addMedicament, patchEstPris } = require("../controllers/MedicamentjourpilulierController.js");

router.post("/", addMedicament);
router.patch("/estPris/:id", patchEstPris);

module.exports = router;
