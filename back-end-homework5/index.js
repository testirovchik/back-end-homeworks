import express from "express";
import userModel from "./models/users.js";
const app = express();
app.get("/users", async (req, res) => {
  const users = await userModel.query().select("name").where("age", ">=", "22").andWhere("salary", ">" , 25000).limit(1).get()
  res.send(users);
});

app.listen(4002, () => console.log("http://localhost:4002"));
