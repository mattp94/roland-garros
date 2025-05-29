import got from "got";

import options from "../options.js";

const parseItem = (body, index) => {
  let rightCurlyBracketIndex = 0;
  let startIndex = index;

  while (rightCurlyBracketIndex >= 0 && --startIndex >= 0) {
    const char = body.charAt(startIndex);

    if (char === "}") {
      rightCurlyBracketIndex++;
    } else if (char === "{") {
      rightCurlyBracketIndex--;
    }
  }

  let leftCurlyBracketIndex = 0;
  let endIndex = index;

  while (leftCurlyBracketIndex >= 0 && ++endIndex < body.length) {
    const char = body.charAt(endIndex);

    if (char === "{") {
      leftCurlyBracketIndex++;
    } else if (char === "}") {
      leftCurlyBracketIndex--;
    }
  }

  const text = body.slice(startIndex, endIndex + 1).replaceAll('\\"', '"');

  try {
    return JSON.parse(text);
  } catch (err) {
    if (options.debug) {
      throw new Error(`Cannot parse ${text}`, { cause: err });
    }

    return null;
  }
};

const parseItems = (body) => {
  const items = [];
  const regExp = /\/sport\/tennis\/roland-garros\/[^\/]+\.html/g;

  let match;

  while ((match = regExp.exec(body))) {
    const item = parseItem(body, match.index);

    if (item) {
      items.push(item);
    }
  }

  return items;
};

export const fetchLives = async () => {
  const url = "https://www.france.tv";

  const { body } = await got(
    `${url}/sport/tennis/roland-garros/tous-les-directs`,
  );

  const items = parseItems(body);

  if (items.length === 0) {
    throw new Error("Aucun direct disponible.");
  }

  const lives = items.map((item) => ({
    title: item.title,
    url: url + item.url,
  }));

  return lives;
};
