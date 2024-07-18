'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sitio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Sitio.init({
    descripcion: DataTypes.STRING,
    latitud: DataTypes.STRING,
    longitud: DataTypes.STRING,
    fotografia: DataTypes.STRING,
    audiofile: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Sitio',
    tableName: 'tbl_sitios',
    timestamps: true
  });
  return Sitio;
};