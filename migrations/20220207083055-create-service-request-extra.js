// 'use strict';
// module.exports = {
//   async up(queryInterface, Sequelize) {
//     await queryInterface.createTable('ServiceRequest', {
//       ServiceRequestId: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER
//       },
//       UserId: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         references: {
//           model: {
//             tableName: 'User',
//             schema: 'schema'
//           },
//           key: 'UserId'
//         },
//       },
//       ServiceId: {
//         allowNull: false,
//         type: Sequelize.INTEGER
//       },
//       ServiceStartDate: {
//         allowNull: false,
//         type: Sequelize.DATE
//       },
//       ZipCode: {
//         allowNull: false,
//         type: Sequelize.STRING
//       },
//       ServiceHourlyRate: {
//         type: Sequelize.DECIMAL
//       },
//       ServiceHours: {
//         allowNull: false,
//         type: Sequelize.FLOAT
//       },
//       ExtraHours: {
//         type: Sequelize.FLOAT
//       },
//       SubTotal: {
//         allowNull: false,
//         type: Sequelize.DECIMAL
//       },
//       Discount: {
//         type: Sequelize.DECIMAL
//       },
//       TotalCost: {
//         allowNull: false,
//         type: Sequelize.DECIMAL
//       },
//       Comments: {
//         type: Sequelize.STRING
//       },
//       PaymentTransactionRefNo: {
//         type: Sequelize.STRING
//       },
//       PaymentDue: {
//         allowNull: false,
//         type: Sequelize.BOOLEAN
//       },
//       ServiceProviderId: {
//         references: {
//           model: 'User',
//           key: 'UserId'
//       },
//         type: Sequelize.INTEGER
//       },
//       SPAcceptedDate: {
//         type: Sequelize.DATE
//       },
//       HasPets: {
//         allowNull: false,
//         type: Sequelize.BOOLEAN
//       },
//       Status: {
//         type: Sequelize.INTEGER
//       },
//       CreatedDate: {
//         allowNull: false,
//         type: Sequelize.DATE
//       },
//       ModifiedDate: {
//         allowNull: false,
//         type: Sequelize.DATE
//       },
//       ModifiedBy: {
//         type: Sequelize.INTEGER
//       },
//       RefundedAmount: {
//         type: Sequelize.DECIMAL
//       },
//       Distance: {
//         type: Sequelize.DECIMAL
//       },
//       HasIssue: {
//         type: Sequelize.BOOLEAN
//       },
//       PaymentDone: {
//         type: Sequelize.BOOLEAN
//       },
//       RecordVersion: {
//         type: Sequelize.UUID
//       },
//       createdAt: {
//         allowNull: false,
//         type: Sequelize.DATE
//       },
//       updatedAt: {
//         allowNull: false,
//         type: Sequelize.DATE
//       }
//     });
//   },
//   async down(queryInterface, Sequelize) {
//     await queryInterface.dropTable('ServiceRequest');
//   }
// };



'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SRExtra', {
      ServiceRequestExtraId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ServiceRequestId: {
        allowNull: false,
        references: {
          model:'ServiceRequest',
          key: 'ServiceRequestId'
        },
        type: Sequelize.INTEGER
      },
      ServiceExtraId: {
        allowNull: false,
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
    await queryInterface.dropTable('ServiceRequestExtra');
  }
};