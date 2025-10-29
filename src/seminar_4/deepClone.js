const deepClone = (objectToClone, depth) => {
    if (depth === 0) 
    {
        return objectToClone;
    }

    const clonedObject = {};
    for (const key in objectToClone)
    {
        if(Object.prototype.hasOwnProperty.call(objectToClone, key))
        {
            clonedObject[key] = deepClone(objectToClone[key], depth - 1);
        }
    }

    return clonedObject;
}

const obj1 = { name: "john", face: {eyes: "brown", brows: "thick"}, age: 23};

const obj2 = deepClone(obj1, 1);

obj2.age = 30;

console.log(obj2);
console.log(obj1);