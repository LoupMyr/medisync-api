const express = require('express')
const app = express()
const port = 3000;
let db = require("./databases.js")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
app.use(express.json());
const config = {
  headers: {
    'Content-Type': 'application/ld+json'
  }
};



app.get('/', (req, res) => {
  res.send('Hello World!');
})


app.post('/auth', async (req, res) => {
  const { email, password } = req.body;


  if (!email || !password) {
    return res.status(400).json({ "error": "Missing required fields: email, password" });
  }


  console.log(hashPasswordSync(password));
  const sql = "SELECT * FROM users WHERE email = ?";

  db.execute(sql, [email], async (err, results) => {
    if (err) {
      return res.status(400).json({ "error": err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ "error": "User not found" });
    }
    const row = results[0];
    const match = await bcrypt.compare(password, row.password);
    if (!match) {
      return res.status(401).json({ "error": "Invalid email or password" });
    }
    const token = jwt.sign({ id: row.id }, "test", {
      algorithm: 'HS256',
      expiresIn: '1h',
    });
    res.json({
      "message": "success",
      "token": token,
      "data": { id: row.id, email: row.email },
    });
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