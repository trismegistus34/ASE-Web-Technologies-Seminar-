// implementați o funcție de formatare a unui string care suportă parametrii numiți; 
// de exemplu "un {substantiv} este {adjectiv}" să poată fi formatat în "un căluț este drăguț".

const createString = (s, substantiv, adjectiv) => {
    let modified = s;
    modified = modified.replace('{substantiv}', substantiv);
    modified = modified.replace('{adjectiv}', adjectiv);

    return modified;
}

console.log(createString("un {substantiv} este {adjectiv}", 'calut', 'dragut'));