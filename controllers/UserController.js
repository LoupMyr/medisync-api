const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

const getUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

const getMedicamentsByUserID = async (req, res) => {
  const { id } = req.params;
  try {
    const medicaments = await prisma.medicament.findMany({
      where: {
        userId: parseInt(id),
      },
    });
    if (medicaments.length > 0) {
      res.json(medicaments);
    } else {
      res.status(404).json({ error: "No medicaments found for this user" });
    }
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

const postUser = async (req, res) => {
  const { email, password, pseudo } = req.body;
  if (!email || !password || !pseudo) {
    return res
      .status(400)
      .json({ error: "Please provide all required fields" });
  }
  try {
    const hash = bcrypt.hashSync(password, 12);
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hash,
        pseudo,
      },
    });
    res.status(201);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Something went wrong while creating the user" });
  }
};

const getPilulierByUserId = async (req, res) => {
  const { id } = req.params;
  try {
    const piluliers = await prisma.pilulier.findMany({
      where: {
        userId: parseInt(id),
      },
    });
    if (piluliers.length > 0) {
      res.json(piluliers);
    } else {
      res.status(404).json({ error: "No piluliers found for this user" });
    }
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
} 

module.exports = {
  getUsers,
  getUserById,
  getMedicamentsByUserID,
  postUser,
  getPilulierByUserId
};
