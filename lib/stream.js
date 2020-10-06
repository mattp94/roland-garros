const got = require('got');

module.exports = async (token) => {
    const { body } = await got(token, { responseType: 'json' });

    return body.url;
};
