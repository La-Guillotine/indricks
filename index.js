const axios = require('axios');
const cheerio = require('cheerio');


async function getProducts(){
    let products = [];
    await axios
        .get('https://www.ultrajeux.com/cat-3-jeux-de-societe.html')
        .then((response) => {
            return response.data;
        })
        .then((data) => {
            let dom = cheerio.load(data);
            dom('#container_droite > .block_produit .contenu').each((index,produit) => {
                let objet = {
                    nom: dom(produit).children('.titre').children('a').text(),
                    url: dom(produit).children('.titre').children('a').attr('href'),
                    prix: dom(produit).children('form').children('.prix').children('.prix').text(),
                    image: dom(produit).children('form').children('div').children('.image').children('a').children('img').attr('src'),
                    promo: dom(produit).children('form').children('.prix').children('.titre_pourcent').text()
                };

                products.push(objet);
            });
        })
        .catch((err) => {
            console.error(err);
        });
        //console.log(products);
        return products;
}

getProducts().then((products) => {
    console.log(products);
});