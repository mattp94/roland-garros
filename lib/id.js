const got = require('got');

module.exports = async (url) => {
    const { body } = await got(url);
    const match = /"videoId":"([^"]+)"/.exec(body);

    if (match) {
        return match[1];
    }

    throw new Error("Aucun id n'a été trouvé.");
};
