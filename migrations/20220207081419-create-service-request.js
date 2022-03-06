// 'use strict';
// module.exports = {
//   async up(queryInterface, Sequelize) {
//     await queryInterface.createTable('ServiceRequestExtra', {
//       ServiceRequestExtraId: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER
//       },
//       ServiceRequestId: {
//         allowNull: false,
//         references: {
//           model:'ServiceRequest',
//           key: 'ServiceRequestId'
//         },
//         type: Sequelize.INTEGER
//       },
//       ServiceExtraId: {
//         allowNull: false,
//         type: Sequelize.INTEGER
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
//     await queryInterface.dropTable('ServiceRequestExtra');
//   }
// };

'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ServiceRequest', {
      ServiceRequestId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'UserId'
        },
      },
      ServiceId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      ServiceStartDate: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      ServiceStartTime: {
        allowNull: false,
        type: Sequelize.TIME
      },
      ZipCode: {
        allowNull: false,
        type: Sequelize.STRING(10)
      },
      ServiceHourlyRate: {
        type: Sequelize.DECIMAL(8,2)
      },
      ServiceHours: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      ExtraHours: {
        type: Sequelize.FLOAT
      },
      SubTotal: {
        allowNull: false,
        type: Sequelize.DECIMAL(8,2)
      },
      Discount: {
        type: Sequelize.DECIMAL(8,2)
      },
      TotalCost: {
        allowNull: false,
        type: Sequelize.DECIMAL(8,2)
      },
      Comments: {
        type: Sequelize.STRING(500)
      },
      PaymentTransactionRefNo: {
        type: Sequelize.STRING(500)
      },
      PaymentDue: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      ServiceProviderId: {
        references: {
          model: 'User',
          key: 'UserId'
      },
        type: Sequelize.INTEGER
      },
      SPAcceptedDate: {
        type: Sequelize.DATE
      },
      HasPets: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      Status: {
        type: Sequelize.INTEGER
      },
      ModifiedBy: {
        type: Sequelize.INTEGER
      },
      RefundedAmount: {
        type: Sequelize.DECIMAL(8,2)
      },
      Distance: {
        type: Sequelize.DECIMAL(18,2)
      },
      HasIssue: {
        type: Sequelize.BOOLEAN
      },
      PaymentDone: {
        type: Sequelize.BOOLEAN
      },
      RecordVersion: {
        type: Sequelize.UUID
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
    await queryInterface.dropTable('ServiceRequest');
  }
};