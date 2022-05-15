import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Label extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Label.belongsToMany(models.Task, { through: 'task_labels' });
    }
  }
  Label.init({
    label: DataTypes.STRING
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Label',
    tableName: 'labels',
  });
  return Label;
};