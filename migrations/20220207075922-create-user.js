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
        type: Sequelize.STRING(100)
      },
      LastName: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      Email: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      Password: {
        type: Sequelize.STRING(100)
      },
      Mobile: {
        allowNull: false,
        type: Sequelize.STRING(20),
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
        type: Sequelize.DATE
      },
      UserProfilePicture: {
        type: Sequelize.STRING(200)
      },
      IsRegisteredUser: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      PaymentGatewayUserRef: {
        type: Sequelize.STRING(200)
      },
      ZipCode: {
        type: Sequelize.STRING(20)
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
        type: Sequelize.INTEGER
      },
      IsApproved: {
        // allowNull: false,
        type: Sequelize.BOOLEAN
      },
      IsActive: {
        allowNull: false,
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