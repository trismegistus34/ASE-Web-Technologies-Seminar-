// scrieți o funcție care primește un array de obiecte și un string și returnează 
// array-ul sortat după cheia specificată prin string.

const people = [
    { name: "John", age: 31 },
    { name: "Jack", age: 27 },
    { name: "James", age: 19 }
];

const keySort = (array, key) => {
    return array.slice().sort((a, b) => {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
        return 0;
    });
};

console.log(keySort(people, "age"));