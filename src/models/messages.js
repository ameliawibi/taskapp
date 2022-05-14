import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Message.belongsTo(models.User, { foreignKey: 'sender_id' })
    }
  }
  Message.init({
    sender_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      }
    },
    message: DataTypes.STRING
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Message',
    tableName: 'messages',
  });
  return Message;
};