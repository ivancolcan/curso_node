import axios from 'axios';
import { writeFileSync } from 'fs';
import jsdom from "jsdom";

const { JSDOM } = jsdom;


const url = "https://elpais.com/";


axios.get(url).then(response => {
    writeFileSync("webScrappingResult.html", response.data, { encoding: "utf-8" });
    const dom = new JSDOM(response.data);
    const titulos = [];
    dom.window.document.querySelectorAll(".c_t a").forEach(element => titulos.unshift(element.innerHTML));
    console.log(titulos);
});
