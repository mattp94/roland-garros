const cheerio = require("cheerio");
const got = require("got");

module.exports = async () => {
  const url = "https://www.france.tv";

  const { body } = await got(
    `${url}/sport/tennis/roland-garros/tous-les-directs`
  );

  const $ = cheerio.load(body);

  const lives = $(".c-live-card-horizontal-epg")
    .map(function () {
      const instance = $(this);

      const title = instance
        .find(".c-live-card-horizontal-epg__subtitle")
        .text()
        .trim();

      const href = instance.attr("href");

      return {
        title,
        url: url + href,
      };
    })
    .get();

  if (!lives.length) {
    throw new Error("Aucun direct disponible.");
  }

  return lives;
};
