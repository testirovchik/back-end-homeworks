"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Attempts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Attempts.hasMany(models.UserAnswers, {
        foreignKey: "attemptId",
        as: "userAnswers",
      });
    }
  }
  Attempts.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: DataTypes.INTEGER,
      quizId: DataTypes.INTEGER,
      isFinished: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      score: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      maxScore: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      details: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Attempts",
      tableName: "attempts",
      timestamps: false,
    }
  );
  return Attempts;
};
