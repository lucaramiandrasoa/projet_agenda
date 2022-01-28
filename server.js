const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models');
const dotenv = require('dotenv');
const CandidatRoutes = require('./routes/candidats.routes');
const EntretientsRoutes = require('./routes/entretients.routes');

dotenv.config();
const app = express();

db.sequelize.sync();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Initialisation application." });
});

app.use("/api/candidat", CandidatRoutes);
app.use("/api/entretient", EntretientsRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});