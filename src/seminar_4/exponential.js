function powerOfTwo() {
    const cache = [2];
    
    const findPowerOfTwo = (index) => {
        if (index < cache.length) {
            console.log("found " + index);
            return cache[index];
        }
        else
        {
            console.log("calculated " + index);
            cache[index] = findPowerOfTwo(index - 1) * 2;
            return cache[index];
        }
    }

    return findPowerOfTwo;
}

const powers = powerOfTwo();
console.log(powers(2));
console.log(powers(5));
console.log(powers(4));