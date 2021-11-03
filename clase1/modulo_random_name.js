import { get_random_name } from "./modulo-npm.js";

(async () => {

    const nombres = [];

    for (let i = 0; i < 10; i++)
        nombres.push(await get_random_name());

    console.log(nombres);


})();



