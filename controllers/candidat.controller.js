const db = require('../models');
const Candidat = db.candidats;
const Entretient = db.entretients;
const Op = db.Sequelize.Op;

// SAVE
exports.create = (req, res) => {
  // CREATE
  const candidat = {
    nom: req.body.nom,
    prenom: req.body.prenom
  };
  // SAVE IN DATABASE
  Candidat.create(candidat)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message
      });
    });
};


exports.findAll = (req, res) => {
  const nom = req.query.nom;
  let condition = nom ? { nom: { [Op.like]: `%${nom}%` } } : null;

  Candidat.findAll({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Candidat.findByPk(id, {})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error id=" + id
      });
    });
};


exports.update = (req, res) => {
  const id = req.params.id;

  Candidat.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Candidat updated successfully."
        });
      } else {
        res.send({
          message: `Impossible avec id=${id}. Candidat introuvabl ou req.body vide!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Candidat.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Deleted successfully!"
        });
      } else {
        res.send({
          message: `Impossible avec id=${id}. Candidat introuvable !`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "erreur id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
    Candidat.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Candidat deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message
      });
    });
};