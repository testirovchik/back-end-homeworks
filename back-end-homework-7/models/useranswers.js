'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserAnswers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserAnswers.belongsTo(models.Attempts, {foreignKey: "attemptId"})
    }
  }
  UserAnswers.init({
    id:{
      type:  DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    attemptId: {
      type:  DataTypes.INTEGER
    },
    questionId: DataTypes.INTEGER,
    answerIds: DataTypes.JSON,
    freeText: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserAnswers',
    tableName: "userAnswers",
    timestamps: false 
  });
  return UserAnswers;
};