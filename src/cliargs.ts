/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/naming-convention */
import {ArgumentParser} from "argparse";
import {readFile} from "fs/promises";
import {dirname, join} from "path";
import {fileURLToPath} from "url";

export interface CLIArgs {
  optionsPath: string;
  outputPath?: string;
}

interface PkgLight {
  version: string;
}

const isPkgLight = (obj: unknown): obj is PkgLight => {
  const rec = obj as Record<string, unknown>;
  return "version" in rec && typeof rec.version === "string";
};

/**
 * Read program version from package.json
 */
const getPkgVersion = async (): Promise<string> => {
  const pkgPath = join(
    dirname(fileURLToPath(import.meta.url)),
    "..",
    "package.json",
  );
  const pkgContent = await readFile(pkgPath, "utf8");
  const pkg = JSON.parse(pkgContent) as unknown;
  if (!isPkgLight(pkg)) {
    throw new Error("Invalid package.json");
  }
  return pkg.version;
};

/**
 * Return the command line arguments.
 */
export const getCLIArgs = async (): Promise<CLIArgs> => {
  const parser = new ArgumentParser({
    add_help: true,
    description: "Generate an OpenAPI specification using swagger-jsdoc",
  });
  parser.add_argument(
    "-v",
    "--version",
    {
      action: "version",
      version: await getPkgVersion(),
    },
  );
  parser.add_argument(
    "-d",
    "--definition",
    {
      help: "JavaScript/JSON file that export the swagger-jsdoc options object",
      dest: "optionsPath",
      required: true,
    },
  );
  parser.add_argument(
    "-o",
    "--output",
    {
      help: "Output file. If omitted, output to stdout.",
      dest: "outputPath",
      required: false,
    },
  );
  return parser.parse_args() as CLIArgs;
};
