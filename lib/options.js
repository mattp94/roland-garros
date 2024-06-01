import { Command } from "commander";

import pkg from "../package.json" assert { type: "json" };

export default new Command()
  .name(pkg.name)
  .option("-a, --app <app>", "open in a specific app")
  .option("-u, --url <url>", "watch a specific URL")
  .option("-r, --reset", "reset your default choices")
  .option("-w, --wait", "wait for the opened app to exit")
  .version(pkg.version)
  .parse(process.argv)
  .opts();
