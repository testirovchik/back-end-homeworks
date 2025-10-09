const express = require("express")
const { sequelize } = require("./models")
const {quizRouter} = require("./routes/quiz.js")
const {attemptRouter} = require("./routes/attempt.js")
const authRouter = require("./routes/auth.js")
const app = express()


app.use(express.json())
app.use(express.urlencoded())

app.use("/quiz", quizRouter);
app.use("/auth", authRouter);
app.use("/attempt", attemptRouter);

    
sequelize.sync({ alert: true }).then(() => {
    console.log("DB SYNC!");
})


app.listen(4002, () => console.log("http://localhost:4002"))