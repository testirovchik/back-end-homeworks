import express from "express"
import "./db/index.js"
import router from "./router.js"
import {Post, User} from "./db/index.js"

// async function run() {
//     await User.deleteMany({})
// }
// run()

const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use("/users", router)


app.listen(4002, () => console.log("Server started at http://localhost:4002"))