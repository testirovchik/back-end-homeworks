'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Answer.belongsTo(models.Questions, { foreignKey: "question_id" })
    }
  }
  Answer.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    text: DataTypes.STRING,
    is_correct: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Answer',
    tableName:"answers",
    timestamps: false
  });
  return Answer;
};