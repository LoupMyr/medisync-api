const express = require('express')
const app = express()
const port = 3000;
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { PrismaClient } = require('@prisma/client');
app.use(express.json());
const config = {
  headers: {
    'Content-Type': 'application/ld+json'
  }
};

const prisma = new PrismaClient()

app.get('/', async (req, res) => {
  res.send('Hello World!');

  const allUsers = await prisma.user.findMany();

  console.log(allUsers);
})


app.post('/auth', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ "error": "Missing required fields: email, password" });
  }



  const match = await bcrypt.compare(password, row.password);
  if (!match) {
    return res.status(401).json({ "error": "Invalid email or password" });
  }


  const token = jwt.sign({ id: row.id }, "test", {
    algorithm: 'HS256',
    expiresIn: '1h',
  });
  res.status(201).json({
    "message": "success",
    "token": token,
    "data": { id: row.id, email: row.email },
  });


});



app.post("/postUser", async (req, res) => {
  let { email, password, pseudo } = req.body;

  // Vérification de la présence des champs requis
  if (!email || !password || !pseudo) {
    return res.status(400).json({ "error": "Missing required fields: email, password, pseudo" });
  }

  // Validation du format de l'email avec une regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ "error": "Invalid email format" });
  }

  // Vérification de la longueur du mot de passe
  if (password.length < 8) {
    return res.status(400).json({ "error": "Invalid password format, require 8 characters" });
  }
  // Hachage du mot de passe
  password = hashPasswordSync(password);

  // Vérification si l'email existe déjà dans la base de données
  const emailCheck = "SELECT * FROM users WHERE email = ?";

  db.execute(emailCheck, [email], async (err, results) => {
    if (results) {
      return res.status(500).json({ "error": "Database error" });
    }



    /*const sql = "INSERT INTO users(email, password) VALUES (?, ?)";
    const params = [email, password];
    db.execute(sql, params, function (err, results) {
      if (err) {
        return res.status(500).json({ "error": "Failed to insert user" });
      }

    });
    */
  });
});




app.listen(port, () => {
  console.log(`API listening on port ${port}`);
})

function hashPasswordSync(password) {
  try {

    const hashedPassword = bcrypt.hashSync(password, 12);

    console.log(hashedPassword);
    return hashedPassword;
  } catch (error) {
    throw new Error('Failed to hash password');
  }
}