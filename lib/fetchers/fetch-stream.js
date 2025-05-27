import got from "got";

export const fetchStream = async (video) => {
  const { body } = await got(video.token.akamai, {
    searchParams: {
      device_type: "desktop",
      browser: "chrome",
      domain: "www.france.tv",
      format: "json",
      url: video.url,
    },
    responseType: "json",
  });

  return body.url;
};
