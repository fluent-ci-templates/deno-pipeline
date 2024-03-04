# Deno Pipeline

[![fluentci pipeline](https://img.shields.io/badge/dynamic/json?label=pkg.fluentci.io&labelColor=%23000&color=%23460cf1&url=https%3A%2F%2Fapi.fluentci.io%2Fv1%2Fpipeline%2Fdeno_pipeline&query=%24.version)](https://pkg.fluentci.io/deno_pipeline)
[![deno module](https://shield.deno.dev/x/deno_pipeline)](https://deno.land/x/deno_pipeline)
![deno compatibility](https://shield.deno.dev/deno/^1.41)
[![dagger-min-version](https://img.shields.io/badge/dagger%20version-v0.10.0-blue?color=3D66FF)](https://dagger.io)
[![ci](https://github.com/fluent-ci-templates/deno-pipeline/actions/workflows/ci.yml/badge.svg)](https://github.com/fluent-ci-templates/deno-pipeline/actions/workflows/ci.yml)

A ready-to-use CI/CD Pipeline for your Deno projects.

![Made with VHS](https://vhs.charm.sh/vhs-3itysSnE548cLEyRNkuLAo.gif)

## 🚀 Usage

Run the following command:

```bash
fluentci run deno_pipeline
```

Or, if you want to use it as a template:

```bash
fluentci init -t deno
```

This will create a `.fluentci` folder in your project.

Now you can run the pipeline with:

```bash
fluentci run .
```

## 🧩 Dagger Module

Use as a [Dagger](https://dagger.io) module:

```bash
dagger install github.com/fluent-ci-templates/deno-pipeline@main
```

Call functions from the module:

```bash
# Format
dagger call fmt --src .

# Lint
dagger call lint --src .

# Test
dagger call test --src . 

# Compile
dagger call compile --src . \
  --file main.ts \
  --output-binary main \
  --target x86_64-unknown-linux-gnu

# Deploy
dagger call deploy --src . \
  --token $DENO_DEPLOY_TOKEN \
  --project $DENO_PROJECT \
  --main main.tsx \
  --no-static false
```

## 🛠️ Environment variables (Deno Deploy)

| Variable          | Description               | Default    |
| ----------------- | ------------------------- | ---------- |
| DENO_PROJECT      | Your project name         |            |
| NO_STATIC         | Disable static assets     | `false`    |
| EXCLUDE           | Exclude files from deploy |            |
| DENO_DEPLOY_TOKEN | Your Deno Deploy token    |            |
| DENO_MAIN_SCRIPT  | Your main script          | `main.tsx` |

## ✨ Jobs

| Job     | Description                                               | Options                |
| ------- | --------------------------------------------------------- | ---------------------- |
| fmt     | Format your code                                          |                        |
| lint    | Lint your code                                            |                        |
| test    | Run your tests                                            | `{ ignore: string[] }` |
| compile | Compile the given script into a self contained executable |                        |
| deploy  | Deploy your app to Deno Deploy                            |                        |

```typescript
lint(
  src: string | Directory | undefined = "."
): Promise<Directory | string>

fmt(
  src: string | Directory | undefined = "."
): Promise<Directory | string>

test(
  src: string | Directory | undefined = ".",
  ignore: string[] = []
): Promise<File | string>

compile(
  src: string | Directory | undefined = ".",
  file = "main.ts",
  output = "main",
  target = "x86_64-unknown-linux-gnu"
): Promise<File | string>

deploy(
  src: string | Directory | undefined = ".",
  token?: string | Secret,
  project?: string,
  main?: string,
  noStatic?: boolean,
  excludeOpt?: string
): Promise<string>
```

## 👨‍💻 Programmatic usage

You can also use this pipeline programmatically:

```ts
import { fmt, lint, test } from "jsr:@fluentci/deno";

await fmt();
await lint();
await test();
```
