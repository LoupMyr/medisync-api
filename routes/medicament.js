const express = require("express");
const router = express.Router();
const { CreateMedicament } = require("../controllers/MedicamentController.js");

router.post("/", CreateMedicament);

module.exports = router;
