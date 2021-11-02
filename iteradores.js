import { get_random_name } from "./modulo-npm.js";


function* getIter1() {
    yield 1;
    yield 2;
    yield 3;
}

async function* getIter2() {
    while (true) {
        yield get_random_name();
    }
}


const iter1 = getIter1();


iter1.next();


for (const n of iter1) {
    console.log({ n });
}

(async () => {


    const names = [];

    const names_iter = getIter2();

    let limit = 3;

    for await (const name of names_iter) {
        console.log({ name });
        names.push(name);
        limit--;
        if (limit <= 0) break;
    }


    //TODO revisar obtener valor de next
    names.push((await names_iter.next()).value);


    console.log(names);


})();
