const got = require('got')

module.exports = async id => {
    try {
        const { body } = await got(
            `https://player.webservices.francetelevisions.fr/v1/videos/${id}`,
            {
                query: {
                    device_type: 'desktop',
                    browser: 'safari'
                },
                json: true
            }
        )

        return body.video.token
    } catch (err) {
        if (err.body && err.body.message) {
            throw new Error(err.body.message)
        }

        throw err
    }
}
