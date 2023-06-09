'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Custemer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Custemer.hasMany(models.items_laundry
      //   {
      //   foreignKey: 'id_custemer',
      //   onDelete: 'CASCADE',
      //   onUpdate: 'RESTRICT'
      // }
      )
    }
  }
  Custemer.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  },
  {
    hooks: {
      afterCreate: async ( user, option) => {
        console.log('>> user aftercreate', sequelize?.models);
        try {
          await sequelize.models.auditLog.create({
            tableName: 'Custemer',
            task: 'insert',
            description: 'proses insert'
          })
        } catch(e) {
          console.log('error user after create', e);
        }
      }
    }, 
    sequelize,
    modelName: 'Custemer',
  });
  return Custemer;
};