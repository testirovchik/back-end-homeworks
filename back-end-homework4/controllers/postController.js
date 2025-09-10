const { readFile, writeFile } = require("fs/promises");
const path = require("path")

class PostController {
    async readPost() {
        const pathName = path.resolve("data.json")
        const allPosts = await readFile(pathName, "utf-8");
        if(!allPosts) {
            return [];
        }
        return JSON.parse(allPosts);
    }

    async writePost(data) {
        const pathName = path.resolve("data.json");
        const allPosts = await this.readPost();
        allPosts.push(data);
        await writeFile(pathName,JSON.stringify(allPosts));
    }
}


module.exports = new PostController();