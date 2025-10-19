import mongoose from "mongoose";

mongoose
  .connect("mongodb://127.0.0.1:27017/test3")
  .then(() => console.log("mongo connected"))
  .catch((err) => console.log("error: " + err));

const userSchema = mongoose.Schema({
  name: String,
  surname: String,
  email: {
    type:String,
    minLength:[14, "email is too short"],
    lowercase:true,
    required:true,
  },
  login: {
    type: String,
    required: true
  },
  password: {
    type: String,
    minLength: [6, "password is too short"],
    required: true,
  },
  age: { type: Number, required: true, min: 15, max: 100 },
  fgpsw: String
});

const postSchema = mongoose.Schema({
  title: String,
  content: String,
  writer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

export const User = mongoose.model("User", userSchema);
export const Post = mongoose.model("Post", postSchema);
