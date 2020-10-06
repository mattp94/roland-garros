const got = require('got');

module.exports = async (id) => {
    try {
        const { body } = await got(
            `https://player.webservices.francetelevisions.fr/v1/videos/${id}`,
            {
                searchParams: {
                    device_type: 'desktop',
                    browser: 'safari',
                },
                responseType: 'json',
            },
        );

        return body.video.token;
    } catch (err) {
        if (err.response.body && err.response.body.message) {
            throw new Error(err.response.body.message);
        }

        throw err;
    }
};
