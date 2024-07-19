'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Add altering commands here.
    await queryInterface.addColumn('tbl_sitios', 'fotografiaBlob', {
      type: Sequelize.BLOB,
      allowNull: true
    });
  },

  async down (queryInterface, Sequelize) {
    // Add reverting commands here.
    await queryInterface.removeColumn('tbl_sitios', 'fotografiaBlob');
  }
};
