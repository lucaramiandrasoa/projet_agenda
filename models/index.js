const dbConfig = require('../config/db.config.js');
const Sequelize = require('sequelize');

const Candidat = require('./candidat.model');
const Entretient =  require('./entretient.model');


const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  dialectOptions: dbConfig.dialectOptions,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.candidats = Candidat(sequelize, Sequelize);
db.entretients = Entretient(sequelize, Sequelize);

// ONE TO MANY
db.candidats.hasMany(db.entretients, { as: "entretients" });
db.entretients.belongsTo(db.candidats, {
  foreignKey: "candidatId",
  as: "candidat",
});

module.exports = db;