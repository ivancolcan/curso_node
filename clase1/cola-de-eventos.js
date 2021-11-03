

export function sumarSync(a, b) {
    let result = 0;
    for (let i = 0; i < 100000000; i++) {
        result = a + b;
    }
    return result;
}

export async function sumarAsync(a, b) {
    return sumarSync(a, b);
}

console.time("sync");

console.log("sync: 2 + 2 = ", sumarSync(2, 2));
console.log("sync: 2 + 3 = ", sumarSync(2, 3));
console.log("sync: 2 + 4 = ", sumarSync(2, 4));

console.timeEnd("sync");


console.time("async");

sumarAsync(2, 2).then(console.log);
sumarAsync(2, 3).then(console.log);
sumarAsync(2, 4).then(console.log);

console.timeEnd("async");


