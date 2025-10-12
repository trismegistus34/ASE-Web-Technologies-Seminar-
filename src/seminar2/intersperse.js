function intersperse(array1, array2) {
    if (array1.length != array2.length)
    {
        return -1;
    }
    else
    {
        let output = [];
        for (let i = 0; i < array1.length; i++)
        {
            output.push(array1[i]);
            output.push(array2[i]);
        }

        return output;
    }
};

let array2 = [1, 3, 5, 7, 9];
let array1 = [0, 2, 4, 6, 8];

console.log(intersperse(array1, array2));