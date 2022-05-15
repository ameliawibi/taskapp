import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Message, {foreignKey:'sender_id'})
    }
  }
  User.init({
    name: DataTypes.STRING,
    avatar: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    timestamps: false,
    modelName: 'User',
    tableName: 'users',
  });
  return User;
};