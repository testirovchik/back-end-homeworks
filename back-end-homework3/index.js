const express = require("express");
const { readAllUsers, writeUsers } = require("./lib/db.js")
const { writeFile } = require("fs/promises")

const app = express();

app.use(express.urlencoded())
app.set("views", "./pages")
app.set("view engine", "pug");


app.get("/",async (req, res) => {
    const users = await readAllUsers("./lib/data.json")
    res.render("home",{users});
})

app.get("/add",(req,res) => {
    res.render("add");
})

app.post("/delete-user/:id", async (req, res) => {
    const userId = Number(req.params.id);
    const users = await readAllUsers("./lib/data.json");
    const filteredUsers = users.filter(user => user.id != userId);
    await writeFile("./lib/data.json", JSON.stringify(filteredUsers));
    res.redirect("/")
})

app.post("/add", async (req, res) => {
    const newUser = req.body;
    newUser.id = Date.now();
    await writeUsers("./lib/data.json", newUser);
    res.redirect("/");
})

app.get("/edit-user/:id", (req, res) => {
    const userId = req.params.id;
    res.render("edit-user.pug", {userId});
})

app.post("/edit-user/:id", async (req, res) => {
    const userId = req.params.id;
    const userItem = req.body;
    const users = await readAllUsers("./lib/data.json");
    const filteredUsers = users.map(user => user.id == userId? {...userItem, id:userId}: user);
    await writeFile("./lib/data.json", JSON.stringify(filteredUsers));
    res.redirect("/");
})




app.listen(4002, ()=> console.log("http://localhost:4002"));