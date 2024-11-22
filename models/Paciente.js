const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const Paciente = sequelize.define('Paciente', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cedula: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, 
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, 
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fechaNacimiento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    tableName: 'Pacientes', 
    timestamps: false,       
  });
  
  module.exports = Paciente;