swagger-jsdoc-cli
=================
Provide a CLI interface to generate swagger/openapi specification from swagger-jsdoc

This reproduce the minimal amount of options I required for existing project already using `swagger-jsdoc`.
Specifically, reading the config from a JavaScript file and specifying path to source files containing OpenAPI definitions.

Usage
-----
Install using `npm` (or similar):

```shell
$ npm install -D @cley_faye/swagger-jsdoc-cli
```

And run:

```shell
$ npx swagger-jsdoc-cli -d <config js path> -o <output path>
```

Configuration file
------------------
The configuration file is expected to be a JavaScript file that exports the "options" object described as the parameter to `swaggerJsdoc()`.

