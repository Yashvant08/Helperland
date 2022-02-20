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
        type: Sequelize.STRING
      },
      Password: {
        type: Sequelize.STRING
      },
      Mobile: {
        allowNull: false,
        type: Sequelize.STRING
      },
      UserTypeId: {
        // allowNull: false,
        type: Sequelize.INTEGER
      },
      Gender: {
        type: Sequelize.INTEGER
      },
      DateOfBirth: {
        type: Sequelize.STRING
      },
      UserProfilePicture: {
        type: Sequelize.STRING
      },
      IsRegisteredUser: {
        // allowNull: false,
        type: Sequelize.BOOLEAN
      },
      PaymentGatewayUserRef: {
        type: Sequelize.STRING
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
      ModifiedBy: {
        // allowNull: false,
        type: Sequelize.INTEGER
      },
      IsApproved: {
        // allowNull: false,
        type: Sequelize.BOOLEAN
      },
      IsActive: {
        // allowNull: false,
        type: Sequelize.BOOLEAN
      },
      IsDeleted: {
        // allowNull: false,
        type: Sequelize.BOOLEAN
      },
      Status: {
        type: Sequelize.INTEGER
      },
      BankTokenId: {
        type: Sequelize.STRING
      },
      Taxno: {
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