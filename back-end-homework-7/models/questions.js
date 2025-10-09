'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Questions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Questions.belongsTo(models.Quiz, { foreignKey: 'quiz_id' })
      Questions.hasMany(models.Answer, { foreignKey: "question_id", as:"answers" })
    }
  }
  Questions.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    text: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Questions',
    tableName: 'questions',
    timestamps: false
  });
  return Questions;
};