const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");

function found(allPosts, id) {
    for(let i = 0;i < allPosts.length;i++) {
        if(allPosts[i].id == id) {
            return allPosts[i];
        }
    }
}


router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const allPosts = await postController.readPost();
    const post = found(allPosts, id);

    const comments = await commentController.readComment();
    const commentObj = comments.find(c => c.id == id);
    const arr = commentObj ? commentObj.value : [];

    res.render("posting", {post, arr});
});

router.post("/comment/:id", async (req, res) => {
    const id = req.params.id;
    await commentController.writeComment(id, req.body.name);

    const allPosts = await postController.readPost();
    const post = found(allPosts, id);

    const comments = await commentController.readComment();
    const commentObj = comments.find(c => c.id == id);
    const arr = commentObj ? commentObj.value : [];

    res.render("posting", {post, arr});
});

module.exports = router;