const sequelize = require('../utils/connection'); 
const { DataTypes } = require('sequelize');

const Objective = sequelize.define('objective', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description:{
    type: DataTypes.TEXT,
    allowNull: true,
  }, 
  budget: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  partialBudget: { 
    type: DataTypes.FLOAT,
    allowNull: true
  },
  icon:{
    type: DataTypes.TEXT,
    allowNull: true
  },
  color: {
    type: DataTypes.TEXT
  },
  deadline: {
    type: DataTypes.STRING, 
    allowNull: false,
  },
});

module.exports = Objective;