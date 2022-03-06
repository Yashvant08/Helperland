'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserAddress', {
      AddressId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        allowNull: false,
        references: {
            model: 'User',
            key: 'UserId'
        },
        type: Sequelize.INTEGER
      },
      Addressline1: {
        allowNull: false,
        type: Sequelize.STRING(200)
      },
      Addressline2: {
        type: Sequelize.STRING(200)
      },
      City: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      State: {
        type: Sequelize.STRING(50)
      },
      PostalCode: {
        allowNull: false,
        type: Sequelize.STRING(20)
      },
      IsDefault: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      IsDeleted: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      Mobile: {
        type: Sequelize.STRING(20)
      },
      Email: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('UserAddress');
  }
};