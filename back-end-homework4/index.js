const express = require("express")
const app = express();

const addPostRoutes = require("./routes/addPostRoutes.js");
const postListRouter = require("./routes/postListsRoutes.js")
const postController = require("./controllers/postController.js")


app.set("view engine", "pug");
app.set("views", "views");

app.use(express.urlencoded())

app.use("/addPost", addPostRoutes)

app.use("/post", postListRouter)

app.get("/", async (req, res) => {
    const allPosts = await postController.readPost()
    res.render("home", { allPosts });
})
// app.use("/users", userRoutes);
// app.use("/products", productRoutes);

// app.use("/posts", postRoutes);




app.listen(4002, () => console.log("http://localhost:4002"))