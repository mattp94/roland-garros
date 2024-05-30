import { Command } from "commander";

import pkg from "../package.json" assert { type: "json" };

export default new Command()
  .name(pkg.name)
  .option("-r, --reset", "reset your default choices")
  .option("-u, --url <url>", "watch a specific URL")
  .version(pkg.version)
  .parse(process.argv)
  .opts();
