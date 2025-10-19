import express from "express";
import bcrypt from "bcrypt";
import { Post, User } from "./db/index.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { sendEmail } from "./node-mailer.js";
const router = express.Router();

dotenv.config();

router.post("/signup", async (req, res) => {
  try {
    const { name, surname, login, password, email, age } = req.body;
    if (!login.trim() || !password.trim()) {
      return res.status(400).send({ message: "please fill the fileds" });
    }
    const found = await User.findOne({ login });
    if (found) {
      return res.status(400).send({ message: "Login is busy" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      surname,
      email,
      login,
      password: hashedPassword,
      age,
    });
    return res.status(201).send({ message: "User successfully created!" });
  } catch (err) {
    console.log(err.message);
    return res.status(400).send({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const { login, password } = req.body;
    if (!login?.trim() || !password?.trim()) {
      return res.status(400).send({ message: "please fill the fields" });
    }
    const found = await User.findOne({ login });
    if (!found) {
      return res.status(400).send({ message: "there is no such a user" });
    }
    const isCorrect = await bcrypt.compare(password, found.password);
    if (!isCorrect) {
      return res.status(400).send({ message: "password is not correct" });
    }
    const token = jwt.sign({ id: found._id }, process.env.JWT_SECRET, {
      expiresIn: "10h",
    });
    return res.status(200).send({ message: "successfully loged in", token });
  } catch (err) {
    console.log(err.message);
    return res.status(400).send({ message: err.message });
  }
});

router.post("/forgot-password", async (req, res) => {
  try {
    const { login } = req.body;
    if (!login.trim()) {
      res.status(400).send({ message: "At first complete your login" });
    }
    const found = await User.findOne({ login });
    if (!found) {
      return res.status(400).send({ message: "There is no such a user" });
    }
    const randomized = Math.floor(100000 + Math.random() * 900000).toString();
    found.fgpsw = randomized;
    await found.save();
    await sendEmail(
      found.email,
      "Password reset code",
      `RESET CODE -- ${randomized}`
    );
    return res
      .status(200)
      .send({ message: `Verification code sent to ${found.email}` });
  } catch (err) {
    console.error(err);
  }
});

router.post("/reset-password", async (req, res) => {
  try {
    const { login, code, newPassword } = req.body;

    if (!login?.trim()) {
      return res.status(400).send({ message: "Please send your login" });
    }
    if (!code?.trim()) {
      return res
        .status(400)
        .send({ message: "Please send reset-password code" });
    }
    if (!newPassword?.trim()) {
      return res.status(400).send({ message: "Please send your new password" });
    }

    const found = await User.findOne({ login });
    if (!found) {
      return res.status(400).send({ message: "There is no such a user" });
    }
    if(!found.fgpsw) {
        return res.status(400).send({message: "At first apply forgot-password endpoint"})
    }

    if (code === found.fgpsw) {
      if (newPassword == found.password) {
        return res
          .status(400)
          .send({ message: "New password can't be the same!" });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      found.password = hashedPassword;
      found.fgpsw = null;
      await found.save();

      return res
        .status(201)
        .send({ message: "The password changed successfully" });
    }

    return res.status(400).send({ message: "The reset code is wrong!" });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Something went wrong" });
  }
});

router.get("/", async (req, res) => {
  const result = await User.find();
  res.send({ ok: result });
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.send({ user });
  } catch {
    return res.status(400).send({ message: "not found" });
  }
});

router.post("/", async (req, res) => {
  const { name, surname, login, password, age } = req.body;
  try {
    console.log(req.body);
    const user = new User({ name, surname, login, password, age });
    await user.save();
    res.status(201).send({ ok: user });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.get("/posts", async (req, res) => {
  const posts = await Post.find();
  res.send({ posts });
});

router.post("/posts", async (req, res) => {
  const { title, content, writer } = req.body;
  const post = await Post.create({ title, content, writer });
  res.status(201).send({ post });
});

router.get("/posts/:key", async (req, res) => {
  const { key } = req.params;
  const post = await Post.findById(key).populate("writer", "-password");
  res.send({ post });
});

export default router;
