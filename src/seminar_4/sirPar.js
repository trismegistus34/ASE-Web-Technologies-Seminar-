class EvenStream {
    #value

    constructor(start) {
        if (start % 2 === 0)
        {
            this.#value = start;
        }
        else
        {
            this.#value = start + 1;
        }
    }

    next() {
        const result = this.#value;
        this.#value += 2;
        return result;
    }
}

const evenStream = new EvenStream(4);

console.log(evenStream.next());
console.log(evenStream.next());
console.log(evenStream.next());
console.log(evenStream.next());
console.log(evenStream.next());
console.log(evenStream.next());