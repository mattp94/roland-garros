import enquirer from "enquirer";

import { fetchLives } from "./fetchers.js";

export const selectUrl = async () => {
  const lives = await fetchLives();

  const { title } = await enquirer.prompt({
    type: "autocomplete",
    name: "title",
    message: "Which live do you wanna watch?",
    choices: lives.map((live) => live.title),
  });

  const { url } = lives.find((live) => live.title === title);

  return url;
};
