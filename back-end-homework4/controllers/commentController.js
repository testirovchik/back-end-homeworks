const { readFile, writeFile } = require("fs/promises");
const path = require("path")

class CommentController {
    async readComment() {
        const pathname = path.resolve("comments.json");
        const comments = await readFile(pathname, "utf-8");
        if(!comments) {
            return [];
        }
        return JSON.parse(comments);
    }
    async writeComment(nameId, body) {
        const pathName = path.resolve("comments.json");
        const comments = await this.readComment()
        for(let i = 0;i < comments.length;i++) {
            if(comments[i].id == nameId) {
                comments[i].value.push(body);
                await writeFile(pathName,JSON.stringify(comments));
                return;
            }
        }
        comments.push({id:nameId,value:[body]})
        await writeFile(pathName,JSON.stringify(comments));
    }
}

module.exports = new CommentController();