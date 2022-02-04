'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('User', {
      UserId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      FirstName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      LastName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique:true
      },
      Password: {
        type: Sequelize.STRING
      },
      Mobile: {
        allowNull: false,
        type: Sequelize.STRING,
        unique:true
      },
      UserTypeId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      Gender: {
        type: Sequelize.INTEGER
      },
      DateOfBirth: {
        type: Sequelize.DATEONLY
      },
      IsRegisteredUser: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      ZipCode: {
        type: Sequelize.STRING
      },
      WorksWithPets: {
        type: Sequelize.BOOLEAN
      },
      LanguageId: {
        type: Sequelize.INTEGER
      },
      NationalityId: {
        type: Sequelize.INTEGER
      },
      ResetKey: {
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
    await queryInterface.dropTable('User');
  }
};