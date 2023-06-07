'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('statuses_laundry', {
       id_custemer: {
        type: Sequelize.INTEGER,
        references :{
          model: 'custemer',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT'
      },
       id_laundry: {
        type: Sequelize.INTEGER,
        references :{
          model: 'laundry',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT'
      },
      status: Sequelize.BOOLEAN
      });
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.dropTable('statuses');
  
  }
};
