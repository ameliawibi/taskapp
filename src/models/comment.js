import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.User, {
        foreignKey: 'user_id'
      });
      Comment.belongsTo(models.Task, {
        foreignKey: 'task_id'
      });
    }
  }
  Comment.init({
    comment: DataTypes.STRING,
    task_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tasks',
        key: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Comment',
    tableName: 'comments',
  });
  return Comment;
};