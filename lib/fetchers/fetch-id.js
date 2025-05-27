import got from "got";

export const fetchId = async (url) => {
  const { body } = await got(url);

  const match = /\\"video_factory_id\\":\\"([^"]+)\\"/.exec(body);

  if (!match) {
    throw new Error("Aucun id n'a été trouvé.");
  }

  return match[1];
};
