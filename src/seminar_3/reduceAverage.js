const array = [102, 404, 826, 927, 99, 27, 268, 59];

const averageNumber = (array) => {
    return array.reduce((number, currentValue) => number + currentValue, 0) / array.length;
}

console.log(averageNumber(array))