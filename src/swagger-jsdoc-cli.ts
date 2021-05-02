import swaggerJSDoc from "./swagger-jsdoc.js";
import {getCLIArgs} from "./cliargs.js";
import {
  getOptions,
  saveOutput,
} from "./io.js";

const main = async () => {
  const cliArgs = await getCLIArgs();
  const options = await getOptions(cliArgs.optionsPath);
  const output = await swaggerJSDoc(options);
  await saveOutput(JSON.stringify(output), cliArgs.outputPath);
};

main()
  .catch(e => {
    // eslint-disable-next-line no-console
    console.error(e);
  });
