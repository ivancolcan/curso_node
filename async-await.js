import { sumarAsync } from "./cola-de-eventos.js";

const resultados = [
    sumarAsync(2, 2),
    sumarAsync(2, 3),
    sumarAsync(2, 4)
];

Promise.all(resultados).then(result => console.log("result then", result));

console.log(resultados);

(async () => {

    console.log("result await", await Promise.all(resultados));

    const resultados2 = [
        await sumarAsync(2, 2),
        await sumarAsync(2, 3),
        await sumarAsync(2, 4)
    ];

    console.log({ resultados2 });


    sumarAsync(2, 2)
        .then(res => sumarAsync(2, res))
        .then(res => sumarAsync(2, res))
        .then(sumaThen => console.log({ sumaThen }));

    let sumaAwait = await sumarAsync(2, 2);
    sumaAwait = await sumarAsync(2, sumaAwait);
    sumaAwait = await sumarAsync(2, sumaAwait);
    console.log({ sumaAwait });



})();



