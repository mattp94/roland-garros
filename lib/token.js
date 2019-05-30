const got = require('got')

module.exports = async id => {
    const { body } = await got(
        `https://player.webservices.francetelevisions.fr/v1/videos/${id}`,
        {
            query: {
                country_code: 'FR',
                device_type: 'desktop',
                browser: 'safari'
            },
            json: true
        }
    )

    return body.video.token
}
