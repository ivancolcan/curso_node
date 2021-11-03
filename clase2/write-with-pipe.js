import { createReadStream, createWriteStream } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const path = join(__dirname, "nombres.txt");
const pathNew = join(__dirname, "nombres-pipe.txt");

const writeStream = createWriteStream(pathNew);

const readStream = createReadStream(path);
readStream.setEncoding("utf-8");

readStream.pipe(writeStream);




