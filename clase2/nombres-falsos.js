import faker from "faker";
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


let data = "";
const n = 1000;
const sep = " ";
const path = join(__dirname, "nombres.txt");

for (let i = 0; i < n; i++) {
    data +=
        faker.name.findName().padStart(30, sep) +
        faker.name.jobArea().padStart(30, sep) +
        faker.phone.phoneNumber().padStart(30, sep) +
        "\n";
}

writeFileSync(path, data, { encoding: "utf-8" });

console.log(data);

