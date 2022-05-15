export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('task_labels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      label_id: {
        type: Sequelize.INTEGER,
        references: {
        model: 'labels',
        key: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('task_labels'); 
  }
};
