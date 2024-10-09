const express = require("express");
const router = express.Router();
const {
    getUsers,
    getUserById,
    GetMedicamentsByUserID
} = require('../controllers/UserController.js')

router.get("/", getUsers)
router.get("/:id", getUserById)
router.get("/medicaments/:id", GetMedicamentsByUserID)
module.exports = router