const fetch = require('node-fetch');

/**
 * Get all France located Maitre restaurants
 * @return {Array} restaurants
 */
module.exports.get = async () => {
    const maitreResponse = await fetch("https://www.maitresrestaurateurs.fr/module/annuaire/ajax/load-maps-data", {"credentials":"include","headers":{"accept":"*/*","accept-language":"fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7","sec-fetch-dest":"script","sec-fetch-mode":"no-cors","sec-fetch-site":"same-origin"},"referrer":"https://www.maitresrestaurateurs.fr/","referrerPolicy":"no-referrer-when-downgrade","body":null,"method":"GET","mode":"cors"})
    .then(res => res.text())
    .then(str => str.substring(20,str.length-3)+']')
    .then(subStr => JSON.parse(subStr));

    return maitreResponse

};
