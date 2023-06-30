'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class items_laundry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      items_laundry.belongsTo(models.Custemer,{
        foreignKey: 'id_custemer',
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT'
      })
      items_laundry.belongsTo(models.laundry, {
        foreignKey: 'id_laundry',
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT'
      })
    }
  }
  items_laundry.init({
    id_custemer: DataTypes.INTEGER,
    id_laundry: DataTypes.INTEGER,
    nama_items: DataTypes.STRING,
    berat_items: DataTypes.STRING,
    status_pembayaran: DataTypes.BOOLEAN
  },
  {
    hooks: {
      afterCreate: async ( user, option) => {
        console.log('>> user aftercreate', sequelize?.models);
        try {
          await sequelize.models.auditLog.create({
            tableName: 'items_laundry',
            task: 'insert',
            description: 'proses insert'
          })
        } catch(e) {
          console.log('error user after create', e);
        }
      }
    },
    sequelize,
    modelName: 'items_laundry',
  });
  return items_laundry;
};