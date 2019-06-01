const got = require('got');

module.exports = async token => {
    const { body } = await got(token, { json: true });

    return body.url;
};
