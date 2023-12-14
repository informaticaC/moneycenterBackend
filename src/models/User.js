const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const User = sequelize.define('user', {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true, // Asegura que el correo electrónico sea único
      allowNull: false // No permite valores nulo
      
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true
    },

    googleId: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },

    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
  },
  actualToken: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
    defaultValue: null
  },
  previousToken: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true
  }

   
  });

  User.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
}

  
  module.exports = User;