'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('items_laundries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_custemer: {
        type: Sequelize.INTEGER,
        references: {
          model: 'custemers',
          foreignKey: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT'
      },
      id_laundry: {
        type: Sequelize.INTEGER,
      },
      nama_items: {
        type: Sequelize.STRING
      },
      berat_items: {
        type: Sequelize.STRING
      },
      status_pembayaran: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('items_laundries');
  }
};