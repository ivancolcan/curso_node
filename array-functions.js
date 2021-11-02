


const names = [
    'Adaline Powlowski',
    'Mr. Sherman Schuster',
    'Prof. Garry Becker',
    'Mr. Jayden Schmeler',
    'Crystel Crist',
    'Kacey Connelly',
    'Nicole Predovic',
    'Jules Beier',
    'Katharina Stehr MD',
    'Miguel Tillman'
];

for (const i in names) {
    console.log({ i, nombre: names[i] });
}

for (const name of names) {
    console.log({ name });
}

process.exit(1);

const nuevo_array = [
    ...names,
    "Luis"
];

console.log(nuevo_array);


const modificado = names.map((nombre, n) => {
    return {
        nombre,
        n,
        length: nombre.length
    };
});
console.log(modificado);


const objeto = names.reduce((acc, current) => {
    acc[current] = current.length;
    return acc;
}, {});

console.log(objeto);


const nuevo_objeto = {};

Object.keys(objeto).forEach(name => {
    nuevo_objeto[name] = objeto[name];
});
nuevo_objeto["Luis Eduardo"] = 4;

console.log(nuevo_objeto);


const nuevo_objeto2 = {
    ...objeto,
    "Luis Eduardo": 4
};



console.log(nuevo_objeto2);





const iniciales = names.reduce((prev, current) => {
    prev += current.slice(0, 1);
    return prev;
}, "");

console.log(iniciales);


const primeros_3 = names.slice(0, 3);

console.log(primeros_3);

const ultimos_3 = names.slice(-3);
console.log(ultimos_3);


console.log(names);

const ultimo = names.pop();
names.unshift(ultimo);

console.log(names);







/*

funciones sobre arrays

- map
- filter
- reduce
- find
- some

- forEach

- shift
- unshift

- pop
- push

- slice

*/




