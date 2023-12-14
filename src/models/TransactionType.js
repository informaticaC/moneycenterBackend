const sequelize = require('../utils/connection'); 
const { DataTypes } = require('sequelize');

const TransactionType = sequelize.define('transactiontype', {
  type: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  color: {
    type: DataTypes.TEXT,
    allowNull: true
  } 
});

module.exports = TransactionType;
