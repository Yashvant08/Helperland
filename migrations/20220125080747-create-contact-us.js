'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ContactUs', {
      ContactUsId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Name: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      Email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(200)
      },
      Subject: {
        allowNull: false,
        type: Sequelize.STRING(500)
      },
      PhoneNumber: {
        allowNull: false,
        type: Sequelize.STRING(20)
      },
      Message: {
        allowNull: false,
        type: Sequelize.STRING
      },
      UploadFileName: {
        allowNull: true,
        type: Sequelize.STRING(100)
      },
      FilePath: {
        allowNull: true,
        type: Sequelize.STRING(500)
      },
      CreatedBy: {
        allowNull: true,
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('ContactUs');
  }
};