'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  status.init({
    id_custemer: DataTypes.INTEGER,
    id_laundry: DataTypes.INTEGER,
    berat: DataTypes.INTEGER,
    estimate: berat * 20,
    harga: berat * 10.000
  }, {
    sequelize,
    modelName: 'status',
  });
  return status;
};