const entretientModel = (sequelize, Sequelize) => {
    const Entretient = sequelize.define("entretient", {
      dateRDV: {
        type: Sequelize.STRING
      },
      heureRDV: {
        type: Sequelize.STRING
      },
      adresse :{
          type : Sequelize.STRING
      }
    });
  
    return Entretient;
  };
  
  module.exports = entretientModel;