import { Command } from "commander";

import pkg from "../package.json" assert { type: "json" };

export default new Command()
  .name(pkg.name)
  .usage("[--reset]")
  .option("-r, --reset", "reset your default choices")
  .version(pkg.version)
  .parse(process.argv)
  .opts();
