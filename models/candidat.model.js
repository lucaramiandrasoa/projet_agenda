const candidatModel = (sequelize, Sequelize) => {
    const Candidat = sequelize.define("candidat", {
      nom: {
        type: Sequelize.STRING
      },
      prenom: {
        type: Sequelize.STRING
      }
    });
  
    return Candidat;
  };
  
  module.exports = candidatModel;