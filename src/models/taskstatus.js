import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class TaskStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TaskStatus.belongsTo(models.Task, {
        foreign_key: 'task_status_id'
      });
    }
  }
  TaskStatus.init({
    status: DataTypes.STRING
  }, {
    sequelize,
    timestamps: false,
    modelName: 'TaskStatus',
    tableName: 'task_statuses',
  });
  return TaskStatus;
};