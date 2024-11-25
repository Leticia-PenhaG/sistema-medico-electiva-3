'use strict';
module.exports = (sequelize, DataTypes) => {
  const Medico = sequelize.define('Medico', {
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    cedula: {
      type: DataTypes.STRING,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    telefono: DataTypes.STRING,
    fechaNacimiento: DataTypes.DATEONLY,
    especialidad: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
          isIn: [[
              'Pediatra', 'Dermatólogo', 'Clínico', 'Cardiólogo', 
              'Neurólogo', 'Oftalmólogo', 'Ginecólogo', 'Cirujano General',
              'Oncólogo', 'Psiquiatra', 'Radiólogo', 'Ortopedista',
              'Endocrinólogo', 'Reumatólogo', 'Infectólogo'
          ]],
      },
  },
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
  }, {});
  Medico.associate = function(models) {
    Medico.hasMany(models.Ficha, { foreignKey: 'medico_id' });
  };
  return Medico;
};