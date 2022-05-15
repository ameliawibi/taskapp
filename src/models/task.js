import { DATE } from 'sequelize';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Task.belongsTo(models.User, {
        foreign_key: 'assigned_to'
      });
      Task.hasOne(models.TaskStatus, {
        foreignKey: 'task_status_id'
      });
    }
  }
  Task.init({
    due_date: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    assigned_to: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      }
    },
    task_status_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'task_statuses',
        key: 'id',
      }
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Task',
    tableName: 'tasks',
  });
  return Task;
};