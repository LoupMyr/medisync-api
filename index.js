const express = require('express');
const app = express();
const port = 3000;
const user_routes = require("./routes/user.js");
const authentification_routes = require("./routes/authentification.js");
const medicament_routes = require("./routes/medicament.js");
const pilulier_routes = require("./routes/pilulier.js");
const medicamentJourPilulier_routes = require('./routes/medicamentjourpilulier.js');
app.use(express.json());

app.use('/api/users', user_routes);
app.use('/api/auth', authentification_routes);
app.use('/api/medicaments', medicament_routes);
app.use('/api/piluliers', pilulier_routes);
app.use('/api/medicamentJour', medicamentJourPilulier_routes);

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});