const path = require("path");
const fs = require("fs/promises");

const extensions = ["jpg", "mp3", "pdf", "txt", "png", "epub"];

async function createFiles() {
    const dir = path.join(__dirname, "test");
    await fs.mkdir(dir);

    for(let i = 1;i <= 150;i++) {
        const ext = extensions[Math.floor(Math.random() * extensions.length)];
        const fileName = `${i}.${ext}`;
        const filePath = path.join(dir, fileName);
        await fs.writeFile(filePath,"");
    }
    console.log("created 150 files");
}



async function organize() {
    await fs.mkdir("result");
    const resultPath = path.join(__dirname, "result");
    const testPath = path.join(__dirname, "test");

    const files = await fs.readdir(testPath);
    const resultCap = await fs.readdir(resultPath);

    for (const file of files) {
        const ext = path.extname(file).slice(1);
        const folderPath = path.join(resultPath, ext);


        if (!resultCap.includes(ext)) {
            await fs.mkdir(folderPath);
            resultCap.push(ext);
        }

        const oldPath = path.join(testPath, file);
        const newPath = path.join(folderPath, file);

        await fs.rename(oldPath, newPath);
    }
}

async function main() {
    const correctWord = process.argv[2];
    if(correctWord == "create") {
        await createFiles();
    }
    if(correctWord == "organize") {
        await organize();
    }
    else {
        console.log("please employ your file correctly");
    }
}
main();


