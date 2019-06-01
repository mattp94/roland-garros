const cheerio = require('cheerio');
const got = require('got');

module.exports = async url => {
    const { body } = await got(url);
    const $ = cheerio.load(body);

    return $('*[id^="PlayerContainer"]').attr('data-video');
};
