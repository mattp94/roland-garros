const yargs = require("yargs");

module.exports = yargs
  .usage("$0 [--reset]")
  .option("reset", {
    alias: "r",
    describe: "Reset your default choices",
    type: "boolean",
  })
  .help()
  .locale("en").argv;
