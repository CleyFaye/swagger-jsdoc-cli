import swaggerJSDocBase from "swagger-jsdoc";

// I'm trying to use v7 of swagger-jsdoc, but since (I assume) it's an RC, DefinitelyTyped don't
// have the proper definitions.
// I see no point in making a bad temporary type definition, so I just break everything.
// Note: Also this is a very thin wrapper; TS is overkill anyway.

export default (
  options: swaggerJSDocBase.Options,
): Promise<unknown> => swaggerJSDocBase(options) as unknown as Promise<unknown>;
