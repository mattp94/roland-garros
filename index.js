#!/usr/bin/env node

const clipboardy = require("clipboardy");
const enquirer = require("enquirer");
const open = require("open");
const { bold, green, magenta, red } = require("chalk");
const { symbols } = require("ansi-colors");

const config = require("./lib/config");
const getId = require("./lib/id");
const getLives = require("./lib/live");
const getStream = require("./lib/stream");
const getVideo = require("./lib/video");
const options = require("./lib/options");

const main = async () => {
  const lives = await getLives();

  if (options.reset) {
    config.clear();
  }

  const { title, app, shouldRemember } = await enquirer.prompt([
    {
      type: "autocomplete",
      name: "title",
      message: "Which live do you wanna watch?",
      choices: lives.map((live) => live.title),
    },
    {
      type: "autocomplete",
      name: "app",
      message: "Which app do you wanna use?",
      choices: ["QuickTime Player", "VLC", "IINA", "Clipboard"],
      skip: config.has("app"),
    },
    {
      type: "confirm",
      name: "shouldRemember",
      message: "Do you wanna remember this app?",
      skip: config.has("app"),
    },
  ]);

  const target = app || config.get("app");
  const { url } = lives.find((live) => live.title === title);

  const id = await getId(url);
  const video = await getVideo(id);
  const stream = await getStream(video);

  if (target === "Clipboard") {
    await clipboardy.write(stream);

    console.log(
      green(symbols.check),
      bold("It has been copied to the Clipboard!")
    );
  } else {
    await open(stream, { app: { name: target.toLowerCase() } });
  }

  if (shouldRemember) {
    config.set({ app: target });
  }
};

main().catch((err) => {
  if (err instanceof Error) {
    console.error(
      red(symbols.cross),
      bold("An error occurred:"),
      magenta(err.message)
    );

    process.exit(1);
  }
});
