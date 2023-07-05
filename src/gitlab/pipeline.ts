import { GitlabCI } from "https://deno.land/x/fluent_gitlab_ci@v0.3.2/mod.ts";
import { test } from "./jobs.ts";

const pipeline = new GitlabCI()
  .image("denoland/deno:alpine")
  .addJob("test", test);

export default pipeline;
