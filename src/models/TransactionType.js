const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection'); 

const TransactionType = sequelize.define('transactiontype', {
  type: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  description: {
    type:DataTypes.TEXT,
    allowNull: false
  }
});

module.exports = TransactionType;
