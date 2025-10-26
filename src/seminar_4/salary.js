const increaseSalary = (salaryArray, percentage) => {
    if(!Array.isArray(salaryArray)) {
        throw new Error("First parameter should be array!");
    }

    if( typeof percentage !== "number")
    {
        throw new Error("Second parameter should be number!");
    }

    return salaryArray.map(salary => salary + (salary * percentage / 100));
}

const salariiInitiale = [3000, 4000, 5000];

// const error1 = increaseSalary(5, "10 Percent");
// const error2 = increaseSalary(salariiInitiale, "10 Percent");
// const error3 = increaseSalary(5, 10);

const salariiFinale = increaseSalary(salariiInitiale, 10);
console.log(salariiFinale);

