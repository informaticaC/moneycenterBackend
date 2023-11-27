const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const InCome = sequelize.define('income', {
    name: {
      type:DataTypes.STRING,
      allowNull: true
    },

    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    //userId
    
  
  });
  
  module.exports = InCome;