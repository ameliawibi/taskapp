import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class TaskLabel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TaskLabel.belongsTo(models.Task,{
        foreignKey: 'task_id',
        constraints: false
      });
      TaskLabel.belongsTo(models.Label,{
        foreignKey: 'label_id',
        constraints: false
      });
    }
  }
  TaskLabel.init({
    task_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tasks',
        key: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    },
    label_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'labels',
        key: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
      }
    }, {
    sequelize,
    timestamps: false,
    modelName: 'TaskLabel',
    tableName: 'task_labels',
  });
  return TaskLabel;
};