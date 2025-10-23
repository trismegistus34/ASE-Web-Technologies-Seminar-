function numbers(...args) {
    let output = [];
    for (let i = 0; i < args.length; i++)
    {
        output[i] = args[i];
    }

    return output;
};

console.log(process.argv.slice(2));