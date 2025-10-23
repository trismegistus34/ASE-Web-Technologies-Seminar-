// implementați cenzurarea unui text printr-o funcție. Funcția primește un șir de caractere și un dicționar sub forma unui array. 
// De exemplu pentru șirul "javascript este minunat" și dicționarul ["este"] funcția va produce "javascript e**e minunat".

const dictionary = ["este"];
const text = "Javascript este minunat";

const censor = (text, dictionary) => {
    return text.split(" ").map((word) => {
        if (dictionary.includes(word))
        {
            const firstchar = word[0];
            const lastchar = word[word.length - 1];
            const censorChar = '*';
            const censorship = censorChar.repeat(word.length - 2);
            word = firstchar + censorship + lastchar;
        }
        return word;
    }).join(" ");
}

console.log(censor(text, dictionary));