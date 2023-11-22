import {
  queryType,
  makeSchema,
  dirname,
  join,
  resolve,
  stringArg,
  booleanArg,
  nonNull,
} from "../../deps.ts";

import { fmt, lint, lintMod, test, deploy, compile } from "./jobs.ts";

const Query = queryType({
  definition(t) {
    t.string("fmt", {
      args: {
        src: stringArg(),
      },
      resolve: async (_root, args, _ctx) => await fmt(args.src || undefined),
    });
    t.string("lint", {
      args: {
        src: stringArg(),
      },
      resolve: async (_root, args, _ctx) => await lint(args.src || undefined),
    });
    t.string("lintMod", {
      args: {
        src: stringArg(),
      },
      resolve: async (_root, args, _ctx) =>
        await lintMod(args.src || undefined),
    });
    t.string("test", {
      args: {
        src: stringArg(),
      },
      resolve: async (_root, args, _ctx) => await test(args.src || undefined),
    });
    t.string("deploy", {
      args: {
        src: stringArg(),
        token: nonNull(stringArg()),
        project: nonNull(stringArg()),
        main: nonNull(stringArg()),
        noStatic: booleanArg(),
      },
      resolve: async (_root, args, _ctx) =>
        await deploy(
          args.src || undefined,
          args.token,
          args.project,
          args.main,
          args.noStatic || false
        ),
    });
    t.string("compile", {
      args: {
        src: stringArg(),
        file: nonNull(stringArg()),
        output: stringArg(),
        target: nonNull(stringArg()),
      },
      resolve: async (_root, args, _ctx) =>
        await compile(
          args.src || undefined,
          args.file,
          args.output,
          args.target
        ),
    });
  },
});

const schema = makeSchema({
  types: [Query],
  outputs: {
    schema: resolve(join(dirname(".."), dirname(".."), "schema.graphql")),
    typegen: resolve(join(dirname(".."), dirname(".."), "gen", "nexus.ts")),
  },
});

schema.description = JSON.stringify({
  "fmt.src": "directory",
  "lint.src": "directory",
  "lintMod.src": "directory",
  "test.src": "directory",
  "deploy.src": "directory",
  "compile.src": "directory",
  "deploy.token": "secret",
  compile: "file",
  test: "file",
  fmt: "directory",
  lint: "directory",
});

export { schema };
