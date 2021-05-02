const reqESM = require("esm")(module);
const {existsSync} = require("fs");
const {join} = require("path");

module.exports = sourceName => {
  let dataDir;
  if (existsSync("src")) {
    reqESM("ts-node").register();
    dataDir = "src";
  } else {
    dataDir = "lib";
  }
  reqESM(join("..", dataDir, sourceName));
};
