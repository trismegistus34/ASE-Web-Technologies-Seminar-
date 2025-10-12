function addToArray() {
    let args = arguments;
    let array = args[0];
    for (let i = 1; i < args.length; i++) {
        array.push(args[i]);
    }
    return array;
}

let array = ["a"];
console.log(addToArray(array, 'b', 'c').join(','));