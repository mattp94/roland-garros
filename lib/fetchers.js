import { JSDOM } from "jsdom";
import got from "got";

export const fetchLives = async () => {
  const lives = [];
  const url = "https://www.france.tv";

  const { body } = await got(
    `${url}/sport/tennis/roland-garros/tous-les-directs`,
  );

  const { document } = new JSDOM(body).window;

  document.querySelectorAll("#panel-0 a.c-card-16x9").forEach((linkElement) => {
    const subtitleElement = linkElement.querySelector(".c-card-16x9__subtitle");

    lives.push({
      title: subtitleElement.textContent.trim(),
      url: url + linkElement.href,
    });
  });

  if (lives.length === 0) {
    throw new Error("Aucun direct disponible.");
  }

  return lives;
};

export const fetchId = async (url) => {
  const { body } = await got(url);
  const match = /"videoId":"([^"]+)"/.exec(body);

  if (!match) {
    throw new Error("Aucun id n'a été trouvé.");
  }

  return match[1];
};

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

export const fetchStream = async (video) => {
  const { body } = await got(video.token, {
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
