import Client from "@dagger.io/dagger";

export const lint = async (client: Client, src = ".") => {
  const context = client.host().directory(src);
  const ctr = client
    .pipeline("lint")
    .container()
    .from("denoland/deno:alpine")
    .withDirectory("/app", context, { exclude: [".git"] })
    .withWorkdir("/app")
    .withExec(["deno", "lint"]);

  const result = await ctr.stdout();

  console.log(result);
};

export const fmt = async (client: Client, src = ".") => {
  const context = client.host().directory(src);
  const ctr = client
    .pipeline("fmt")
    .container()
    .from("denoland/deno:alpine")
    .withDirectory("/app", context, { exclude: [".git"] })
    .withWorkdir("/app")
    .withExec(["deno", "fmt"]);

  const result = await ctr.stdout();

  console.log(result);
};

export const test = async (client: Client, src = ".") => {
  const context = client.host().directory(src);
  const ctr = client
    .pipeline("test")
    .container()
    .from("denoland/deno:alpine")
    .withDirectory("/app", context, { exclude: [".git"] })
    .withWorkdir("/app")
    .withMountedCache("/root/.cache/deno", client.cacheVolume("deno-cache"))
    .withExec(["deno", "test", "-A"]);

  const result = await ctr.stdout();

  console.log(result);
};
