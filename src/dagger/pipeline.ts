import Client, { connect } from "@dagger.io/dagger";
import * as jobs from "./jobs.ts";

const { fmt, lint, test } = jobs;

export default function pipeline(src = ".", args: string[] = []) {
  connect(async (client: Client) => {
    if (args.length > 0) {
      await runSpecificJobs(client, args);
      return;
    }

    await fmt(client, src);
    await lint(client, src);
    await test(client, src);
  });
}

async function runSpecificJobs(client: Client, args: string[]) {
  for (const name of args) {
    // deno-lint-ignore no-explicit-any
    const job = (jobs as any)[name];
    if (!job) {
      throw new Error(`Job ${name} not found`);
    }
    await job(client);
  }
}
