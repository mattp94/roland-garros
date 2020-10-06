const cheerio = require('cheerio');
const got = require('got');

module.exports = async () => {
    const url = 'https://www.france.tv';

    const { body } = await got(
        `${url}/sport/tennis/roland-garros/tous-les-directs`,
    );

    const $ = cheerio.load(body);

    const lives = $('.c-live-card-horizontal')
        .map(function () {
            const instance = $(this);

            const href = instance
                .find('.c-live-card-horizontal__link')
                .attr('href');

            const title = instance
                .find('.c-live-card-horizontal__details-subtitle')
                .text();

            return {
                url: url + href,
                title,
            };
        })
        .get();

    if (!lives.length) {
        throw new Error('Aucun direct disponible.');
    }

    return lives;
};
