'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    

    await queryInterface.bulkInsert('laundries', [
      {
      parfume: 'a',
      harga: '5.000/kg'
      },
      {
      parfume: 'b',
      harga: '4.000/kg'
      },
      {
      parfume: 'c',
      harga: '4.000/kg'
      },
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
    */
    await queryInterface.bulkDelete('laundries', null, {});
  }
};
