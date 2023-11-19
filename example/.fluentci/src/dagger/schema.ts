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

import { fmt, lint, test, deploy, compile, lintMod } from "./jobs.ts";

const Query = queryType({
  definition(t) {
    t.string("fmt", {
      args: {
        src: stringArg(),
      },
      resolve: async (_root, args, _ctx) => await fmt(args.src),
    });
    t.string("lint", {
      args: {
        src: stringArg(),
      },
      resolve: async (_root, args, _ctx) => await lint(args.src),
    });
    t.string("lintMod", {
      args: {
        src: stringArg(),
      },
      resolve: async (_root, args, _ctx) => await lintMod(args.src),
    });
    t.string("test", {
      args: {
        src: stringArg(),
      },
      resolve: async (_root, args, _ctx) => await test(args.src),
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
          args.src,
          args.token,
          args.project,
          args.main,
          args.noStatic
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
        await compile(args.src, args.file, args.output, args.target),
    });
  },
});

export const schema = makeSchema({
  types: [Query],
  outputs: {
    schema: resolve(join(dirname(".."), dirname(".."), "schema.graphql")),
    typegen: resolve(join(dirname(".."), dirname(".."), "gen", "nexus.ts")),
  },
});
