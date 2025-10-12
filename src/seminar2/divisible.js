function checkDivisible(n, divisor) {
    if (n % divisor === 0 )
    {
        return true;
    }
    else 
    {
        return false;
    }
};

console.log(checkDivisible(10, 2));
console.log(checkDivisible(10, 3));