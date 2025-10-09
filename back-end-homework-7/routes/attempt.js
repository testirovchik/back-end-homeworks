const express = require("express");
const attemptRouter = express.Router();
const {
  Quiz,
  Questions,
  Answer,
  User,
  Attempts,
  UserAnswers,
} = require("../models");
const app = express();
const { authMiddleWare } = require("../middlewears/auth.js");

attemptRouter.post("/:id/answers", authMiddleWare, async (req, res) => {
  const { id } = req.params;

  if (!req.body) {
    return res.status(400).send({ message: "please send your answers" });
  }

  if (!Array.isArray(req.body)) {
    return res.status(400).send({ message: "must be an array" });
  }

  const attempt = await Attempts.findOne({
    where: { id, userId: req.user.id, isFinished: false },
  });

  if (!attempt) {
    return res.status(400).send({ message: "there is no such an attempt" });
  }

  for (let ans of req.body) {
    const { questionId, answerIds, freeText } = ans;
    if (!questionId) continue;

    await UserAnswers.create({
      questionId,
      answerIds,
      attemptId: attempt.id,
      freeText,
    });
  }

  res.status(201).send({ message: "answers added successfully" });
});

attemptRouter.post("/:id/submit", authMiddleWare, async (req, res) => {
  const { id } = req.params;

  const attempt = await Attempts.findOne({
    where: { id, userId: req.user.id, isFinished: false },
    include: [
      {
        model: UserAnswers,
        as: "userAnswers",
      },
    ],
  });
  if (!attempt) {
    return res.status(400).send({ message: "No active attempt found" });
  }
  let details = [];
  let totalScore = 0;
  for (const userAnswer of attempt.userAnswers) {
    if (userAnswer.answerIds) {
      const correctAnswers = await Answer.findAll({
        where: { question_id: userAnswer.questionId, is_correct: 1 },
      });
      console.log(correctAnswers);
      const correctIds = correctAnswers.map((a) => a.id);
      const selectedIds = userAnswer.answerIds || [];

      const isCorrect =
        selectedIds.every((id) => correctIds.includes(id)) &&
        correctIds.every((id) => selectedIds.includes(id));

      if (isCorrect) {
        totalScore += 10;
        details.push({questionId: userAnswer.questionId, correct: true, earned: 10})
      }else{
        details.push({questionId: userAnswer.questionId, correct: false, earned: 0})
      }
    }
  }

  await attempt.update({
    score: totalScore,
    maxScore: attempt.maxScore > totalScore ? attempt.maxScore : totalScore,
    isFinished: 1,details
  });

  return res.send({
    message: "Successfully submitted",
    score: totalScore,
    maxScore: attempt.maxScore,
  });
});

attemptRouter.get("/:id", authMiddleWare, async (req, res) => {
  console.log(req.user)
  const {id} = req.params
  console.log(id)
  const attemp = await Attempts.findOne({where: { id, userId: req.user.id, isFinished: 1 }})
  if (!attemp) {
    return res.status(404).send({ message: "Attempt not found" });
  }
  return res.status(200).send({message: {
    attempId:attemp.id,
    quizId:attemp.quizId,
    score:attemp.score,
    maxScore:attemp.maxScore,
    details: attemp.details || []
  }})
})

module.exports = { attemptRouter };
