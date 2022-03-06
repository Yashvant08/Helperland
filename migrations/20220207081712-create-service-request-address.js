'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SRAddress', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ServiceRequestId: {
        references: {
          model:'ServiceRequest',
            
          key: 'ServiceRequestId'
        },
        type: Sequelize.INTEGER
      },
      Addressline1: {
        type: Sequelize.STRING(200)
      },
      Addressline2: {
        type: Sequelize.STRING(200)
      },
      City: {
        type: Sequelize.STRING(50)
      },
      State: {
        type: Sequelize.STRING(50)
      },
      PostalCode: {
        type: Sequelize.STRING(20)
      },
      Mobile: {
        type: Sequelize.STRING(20)
      },
      Email: {
        type: Sequelize.STRING(100)
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
    await queryInterface.dropTable('SRAddress');
  }
};