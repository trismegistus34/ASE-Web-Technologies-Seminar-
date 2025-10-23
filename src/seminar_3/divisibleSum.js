// implementați o funcție care primește ca parametrii un array de 
// numere și un număr și returnează suma tuturor numerelor din array divizibile cu cel de-al doilea parametru.

const divisibleSum = (number, array) => {
    return array.filter((x) => {
        if (x%number == 0) return true;
        else return false;
    }).reduce((sum, val) => sum + val, 0);
}

const number = 2;
const array = [1, 5, 8, 22, 28, 32, 37, 44, 9];

console.log(divisibleSum(number, array));