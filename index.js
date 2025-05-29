#!/usr/bin/env node --no-warnings

import ansi from "ansi-colors";
import chalk from "chalk";
import clipboardy from "clipboardy";
import open from "open";

import { fetchId } from "./lib/fetchers/fetch-id.js";
import { fetchStream } from "./lib/fetchers/fetch-stream.js";
import { fetchVideo } from "./lib/fetchers/fetch-video.js";
import { selectApp, selectUrl } from "./lib/selectors.js";
import config from "./lib/config.js";
import options from "./lib/options.js";

try {
  if (options.reset) {
    config.clear();
  }

  const url = options.url || (await selectUrl());
  const app = options.app || (await selectApp());

  const id = await fetchId(url);
  const video = await fetchVideo(id);
  const stream = await fetchStream(video);

  if (/^clipboard$/i.test(app)) {
    await clipboardy.write(stream);

    console.log(
      chalk.green(ansi.symbols.check),
      chalk.bold("It has been copied to the clipboard!"),
    );
  } else {
    await open(stream, {
      app: { name: app.toLowerCase() },
      wait: options.wait,
    });
  }
} catch (err) {
  if (options.debug) {
    throw err;
  }

  if (err instanceof Error) {
    console.error(
      chalk.red(ansi.symbols.cross),
      chalk.bold("An error occurred:"),
      chalk.magenta(err.message),
    );

    process.exit(1);
  }
}
