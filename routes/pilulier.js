const express = require("express");
const router = express.Router();
const { CreatePilulier } = require("../controllers/PilulierController.js");

router.post("/", CreatePilulier);

module.exports = router;
