const fs = require("fs");
const { join } = require('path');
const { suma } = require("./cola-de-eventos");


const resultado = "suma 2 + 2 = " + suma.sumarSync(2, 2);

const path = join(__dirname, "resultadoSuma.txt");

console.log(path);

fs.writeFileSync(path, resultado, { encoding: "utf-8" });

