const cheerio = require('cheerio');
const got = require('got');

module.exports = async () => {
    const url = 'https://sport.francetvinfo.fr';

    const { body } = await got(`${url}/roland-garros/direct`);
    const $ = cheerio.load(body);

    const lives = $('article.excerpt-murky a')
        .map((i, item) => ({
            url: url + item.attribs.href,
            title: item.attribs.title.trim(),
        }))
        .get();

    if (!lives.length) {
        throw new Error('Aucun direct disponible.');
    }

    return lives;
};
