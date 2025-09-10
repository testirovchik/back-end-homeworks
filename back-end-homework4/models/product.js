const postController = require("../controllers/postController")

class ProductModel {
    
    async allPosts() {
        const posts = await postController.readPost();
        return posts;
    }
    async addPost(data) {
        await postController.writePost(data);
    }
}

module.exports = new ProductModel();