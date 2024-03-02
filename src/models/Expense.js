const {DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Expense = sequelize.define('expenses', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  date: {
    type: DataTypes.STRING,
    allowNull: true
  },
  icon:{
    type: DataTypes.TEXT,
    allowNull: true
  }
});

module.exports = Expense;
