const db = require('../models');
const Candidat = db.candidats;
const Entretient = db.entretients;
const Op = db.Sequelize.Op;

// SAVE
exports.create = (req, res) => {
  const entretient = {
    dateRDV: req.body.dateRDV,
    heureRDV: req.body.heureRDV,
    adresse: req.body.adresse,
    candidatId: req.body.candidatId
  };
  // SAVE IN DATABASE
  Entretient.create(entretient)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

exports.findAll = (req, res) => {
  Entretient.findAll({
      include: [
        {
          model: Candidat,
          as: "candidat",
        },
      ],
    })
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

exports.findDateORHour = (req, res) => {
  Entretient.findAll({
    where: {
      [Op.or]: [{ dateRDV : "03/02/2022" }, { heureRDV : "08:00" }]
    },
      include: [
        {
          model: Candidat,
          as: "candidat",
        },
      ],
    })
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

  Entretient.findByPk(id, {})
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

  Entretient.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Entretients updated successfully."
        });
      } else {
        res.send({
          message: `Impossible avec id=${id}. Entretients introuvabl ou req.body vide!`
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

  Entretient.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Entretient deleted successfully!"
        });
      } else {
        res.send({
          message: `Impossible avec id=${id}. Entretient introuvable !`
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
    Entretient.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Entretient deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message
      });
    });
};