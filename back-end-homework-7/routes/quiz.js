const express = require("express")
const quizRouter = express.Router()
const { Quiz, Questions, Answer, User, Attempts, UserAnswers } = require("../models")
const app = express();
const {authMiddleWare} = require("../middlewears/auth.js")

quizRouter.post("/", async (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "missing fields..." })
    }
    const { name, description } = req.body

    if (!name.trim() || !description.trim()) {
        return res.status(400).send({ message: "Please fill all the fields" })
    }
    const found = await Quiz.findOne({ where: { name } })
    if (found) {
        return res.status(400).send({ message: "please use another name for the quiz" })
    }

    const quiz = await Quiz.create({ name, description })
    res.status(201).send({ message: "created", quiz })

})

quizRouter.post("/:id/question", async (req, res) => {
    console.log(req.body)
    if (!req.body) {
        return res.status(400).send({ message: "Missing Fields..." })
    }
    const { id } = req.params
    const { text, answers = [] } = req.body

    const found = await Quiz.findByPk(id)
    if (!found) {
        return res.status(404).send({ message: "Quiz not found" })
    }
    if (!text || !text.trim()) {
        return res.status(400).send({ message: "Please fill the content of the question" })
    }
    const question = await Questions.create({ text, quiz_id: id })

    for (let answer of answers) {
        await Answer.create({
            text: answer.text,
            is_correct: answer.is_correct,
            question_id: question.id
        })
    }
    res.status(201).send({ message: "question has been added successfully" })
})

quizRouter.get("/:id", async (req, res) => {
    const { id } = req.params
    const quiz = await Quiz.findByPk(id, {
        include: [
            {
                model: Questions,
                as: "questions",
                include: {  
                    model: Answer,
                    as: "answers",
                    attributes: { exclude: ['is_correct'] }
                }
            }
        ]
    })
    if (!quiz) {
        return res.status(404).send({ message: "Quiz not found" })
    }

    return res.send({ quiz })
})

quizRouter.post("/:id/attempt",authMiddleWare,async(req, res) => {
    const {id} = req.params;
    const quiz = await Quiz.findByPk(id)
    if(!quiz) {
        return res.status(400).send({message: "There is no such a quiz!"});
    }
    const user = await User.findByPk(req.user.id)
    if(!user) {
        return res.status(400).send({message: "There is no such a user"});
    }

    const foundUser = await Attempts.findOne({where: {userId: req.user.id, quizId: id, isFinished: 0},
        include: [
            {
                model: UserAnswers,
                as: "userAnswers"
            }
        ]
    })

    if(!foundUser) {
        foundUser = await Attempts.create({userId: req.user.id, quizId: id})
    }

    return res.status(200).send({message: foundUser});
})

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzYwMDQ0MzEzLCJleHAiOjE3NjAwNjk1MTN9.FU4iqAMJVtQzd3t6GiJkp1P-4K3bZ6krTi6OXdMT6as

module.exports = {quizRouter}