const express = require("express");
const router = express.Router();
const {
  authentification,
} = require("../controllers/AuthentificationController.js");

router.post("/", authentification);

module.exports = router;
