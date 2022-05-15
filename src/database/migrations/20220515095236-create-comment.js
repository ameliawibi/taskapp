export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      comment: {
        type: Sequelize.STRING
      },
      task_id: {
        type: Sequelize.INTEGER,
        references: {
        model: 'tasks',
        key: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('comments');
  }
};