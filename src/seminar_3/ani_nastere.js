let ages = [12, 17, 28, 54, 43, 11, 9, 18, 22];

const filterAges = (ages) => {
    const result = ages.filter((age) => {
        if (age > 18) return true;
        else return false;
    })
    return result;
}

console.log(filterAges(ages));