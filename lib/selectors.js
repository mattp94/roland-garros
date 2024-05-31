import enquirer from "enquirer";

import { fetchLives } from "./fetchers.js";
import config from "./config.js";

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

export const selectApp = async () => {
  if (config.has("app")) {
    return config.get("app");
  }

  const { app, shouldRemember } = await enquirer.prompt([
    {
      type: "autocomplete",
      name: "app",
      message: "Which app do you wanna use?",
      choices: ["QuickTime Player", "VLC", "IINA", "Clipboard"],
    },
    {
      type: "confirm",
      name: "shouldRemember",
      message: "Do you wanna remember this app?",
    },
  ]);

  if (shouldRemember) {
    config.set("app", app);
  }

  return app;
};
