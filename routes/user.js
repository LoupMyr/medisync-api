const express = require("express");
const router = express.Router();
const {
    getUsers,
    getUserById,
    getMedicamentsByUserID,
    postUser,
    getPilulierByUserId
} = require('../controllers/UserController.js')

router.get("/", getUsers);
router.get("/:id", getUserById);
router.get("/medicaments/:id", getMedicamentsByUserID);
router.get("/piluliers/:id", getPilulierByUserId);
router.post("/", postUser);
module.exports = router