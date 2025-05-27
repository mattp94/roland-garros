import got from "got";

export const fetchVideo = async (id) => {
  try {
    const { body } = await got(`https://k7.ftven.fr/videos/${id}`, {
      searchParams: {
        device_type: "desktop",
        browser: "chrome",
        domain: "www.france.tv",
      },
      responseType: "json",
    });

    return body.video;
  } catch (err) {
    if (err.response.body && err.response.body.message) {
      throw new Error(err.response.body.message);
    }

    throw err;
  }
};
