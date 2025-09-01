const { readFile,writeFile } = require("fs/promises");
const path = require("path");
const querystring = require("querystring");

async function readAllUsers(pathname){
    const content = await readFile(pathname, "utf-8");
    if(!content) {
        return [];
    }
    return JSON.parse(content);
}

async function writeUsers(pathname, user) {
    const users = await readAllUsers(pathname);
    users.push(user);
    await writeFile(pathname, JSON.stringify(users))
}

module.exports = {readAllUsers, writeUsers}