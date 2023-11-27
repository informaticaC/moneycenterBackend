const {DataTypes } = require('sequelize');
const sequelize = require('../utils/connection'); 

const Objective = sequelize.define('objective', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description:{
    type: DataTypes.TEXT,
    allowNull: false,
  }, 
  budget: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deadline: {
    type: DataTypes.STRING, 
    allowNull: false,
  },
});

module.exports = Objective;