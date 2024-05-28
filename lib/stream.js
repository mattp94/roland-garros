const got = require("got");

module.exports = async (video) => {
  const {
    body: { url },
  } = await got(video.token, {
    searchParams: {
      device_type: "desktop",
      browser: "chrome",
      domain: "www.france.tv",
      format: "json",
      url: video.url,
    },
    responseType: "json",
  });

  return url;
};
