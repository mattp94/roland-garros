const cheerio = require('cheerio');
const got = require('got');

module.exports = async () => {
    const url = 'https://www.france.tv';

    const { body } = await got(`${url}/sport/tennis/roland-garros/tous-les-directs`);
    const $ = cheerio.load(body);

    const lives = $('.c-live-card-horizontal')
        .map((i, item) => ({
            url: url + $(item).find('.c-live-card-horizontal__link').attr('href'),
            title: $(item).find('.c-live-card-horizontal__details-subtitle').text(),
        }))
        .get();

    if (!lives.length) {
        throw new Error('Aucun direct disponible.');
    }

    return lives;
};
