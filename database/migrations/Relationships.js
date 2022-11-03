/* eslint-disable no-undef */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Uso promise.all ya que se ejecutan de forma asíncrona estas peticiones contra la DB.
    return Promise.all([
      queryInterface.addColumn('Users', 'roleId', {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 2,
        references: {
          model: 'Roles',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
      queryInterface.addColumn('Transactions', 'userId', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
      queryInterface.addColumn('Transactions', 'categoryId', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Categories',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
    ]);
  },

  async down(queryInterface) {
    return Promise.all([
      queryInterface.removeColumn('Roles', 'userId'),
      queryInterface.removeColumn('Users', 'postId'),
      queryInterface.removeColumn('Categories', 'postId'),
      queryInterface.removeColumn('Transaction', 'postId'),
    ]);
  },
};
