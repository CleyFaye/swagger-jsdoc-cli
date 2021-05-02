import {
  writeFile,
  readFile,
} from "fs/promises";
import swaggerJSDoc from "swagger-jsdoc";
import {extname, resolve} from "path";

/**
 * Write the output to either stdout or the provided path
 */
export const saveOutput = async (
  content: string,
  outputPath?: string,
): Promise<void> => {
  if (outputPath === undefined || outputPath === "-") {
    process.stdout.write(content);
    return;
  }
  await writeFile(outputPath, content);
};

/**
 * Read the options object from input path
 *
 * There's no safety check, let's assume swaggerJSDoc will throw up in case of problem
 */
export const getOptions = async (inputPath: string): Promise<swaggerJSDoc.Options> => {
  const ext = extname(inputPath);
  if (ext === ".json") {
    const jsonContent = await readFile(inputPath, "utf8");
    return JSON.parse(jsonContent) as swaggerJSDoc.Options;
  }
  const modulePath = resolve(inputPath);
  const module = await import(modulePath) as {default: swaggerJSDoc.Options};
  return module.default;
};
