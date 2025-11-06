import { rimraf } from 'rimraf';
import fs from 'fs/promises';

const dirPath = './folder';
const filePath = `${dirPath}/file.txt`;

async function directoryManipulation() 
{
    await fs.mkdir(dirPath, {recursive: true});
    console.log('Directorul a fost creat: ' + dirPath);

    await fs.writeFile(filePath, 'test');
    console.log('Fisierul a fost creeat:' + filePath);

    await rimraf(dirPath);
    console.log("Directorul a fost sters.");
}

directoryManipulation();