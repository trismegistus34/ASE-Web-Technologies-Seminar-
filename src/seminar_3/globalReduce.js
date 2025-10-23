// reimplementați metoda reduce(reduceleft) ca o funcție globală

const reduce = (array, callback, initialValue) => {
    let currentValue = initialValue;
    for (let i = 0; i < array.length; i++)
    {
        currentValue = callback(currentValue, array[i]);
    }
    return currentValue;
}

console.log(reduce([1, 2, 3, 4, 5], (x, y) => x + y, 0));