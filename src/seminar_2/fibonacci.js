const fibonacci = (number) => {
    if (number === 1)
    {
        return 0;
    }
    else if (number === 2)
    {
        return 1;
    }
    else return fibonacci(number - 1) + fibonacci(number - 2);
}

if (process.argv.length < 3) {
    console.log('Not enough parameters!');
}
else if (process.argv.length > 3) {
    console.log('Too many parameters!');
}
else
{
    console.log(fibonacci(parseInt(process.argv[2])));
}