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
    date: {
      type: DataTypes.STRING,
      allowNull: true
    },
    icon:{
      type: DataTypes.TEXT,
      allowNull: true
    }
    //userId
    
  });
  
  module.exports = InCome;