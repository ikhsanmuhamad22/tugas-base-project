'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class laundry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      laundry.hasMany(models.items_laundry
      //   {
      //   foreignKey: 'id_laundry',
      //   onDelete: 'CASCADE',
      //   onUpdate: 'RESTRICT'
      // }
      )
    }
  }
  laundry.init({
    parfume: DataTypes.STRING,
    harga: DataTypes.STRING
  },
  {
    hooks: {
      afterCreate: async ( user, option) => {
        console.log('>> user aftercreate', sequelize?.models);
        try {
          await sequelize.models.auditLog.create({
            tableName: 'laundry',
            task: 'insert',
            description: 'proses insert'
          })
        } catch(e) {
          console.log('error user after create', e);
        }
      }
    },
    sequelize,
    modelName: 'laundry',
  });
  return laundry;
};