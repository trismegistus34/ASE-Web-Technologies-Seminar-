function occureences(text, character) {
    let count = 0;
    for (let i = 0; i < text.length; i++)
    {
        if (text.charAt(i) === character)
        {
            count++;
        }
    }
    return count;
};

console.log(occureences('sample text', 'e'));