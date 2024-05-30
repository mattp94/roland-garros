#!/usr/bin/env node --no-warnings

import ansi from "ansi-colors";
import chalk from "chalk";
import clipboardy from "clipboardy";
import enquirer from "enquirer";
import open from "open";

import { fetchId, fetchStream, fetchVideo } from "./lib/fetchers.js";
import { selectUrl } from "./lib/selectors.js";
import config from "./lib/config.js";
import options from "./lib/options.js";

try {
  if (options.reset) {
    config.clear();
  }

  const url = options.url || (await selectUrl());
  const id = await fetchId(url);
  const video = await fetchVideo(id);
  const stream = await fetchStream(video);

  const { app, shouldRemember } = await enquirer.prompt([
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

  if (target === "Clipboard") {
    await clipboardy.write(stream);

    console.log(
      chalk.green(ansi.symbols.check),
      chalk.bold("It has been copied to the Clipboard!"),
    );
  } else {
    await open(stream, { app: { name: target.toLowerCase() } });
  }

  if (shouldRemember) {
    config.set("app", target);
  }
} catch (err) {
  if (err instanceof Error) {
    console.error(
      chalk.red(ansi.symbols.cross),
      chalk.bold("An error occurred:"),
      chalk.magenta(err.message),
    );

    process.exit(1);
  }
}
