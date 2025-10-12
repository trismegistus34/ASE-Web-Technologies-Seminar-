const sampleText = 'I agree with your opinion, but I would rather die than give you the right to say it.';

const getFrequency = (text) => {
    const result = {};

    for (let i = 0; i < text.length; i++)
    {
        const char = text[i].toUpperCase();

        if (char >= 'A' && char <= 'Z') 
        {
            if (char in result)
            {
                result[char]++
            }
            else
            {
                result[char] = 1;
            }
        }
    }

    for (let char in result) {
        result[char] /= 27; 
    }

    return result;
}

console.log(getFrequency(sampleText));