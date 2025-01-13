use extism_pdk::*;
use fluentci_pdk::dag;

#[plugin_fn]
pub fn task(args: String) -> FnResult<String> {
    let stdout = dag()
        .pipeline("task")?
        .pkgx()?
        .with_packages(vec!["deno"])?
        .with_exec(vec!["deno", "task", &args])?
        .stdout()?;
    Ok(stdout)
}

#[plugin_fn]
pub fn run(args: String) -> FnResult<String> {
    let stdout = dag()
        .pipeline("run")?
        .pkgx()?
        .with_packages(vec!["deno"])?
        .with_exec(vec!["deno", "run", &args])?
        .stdout()?;
    Ok(stdout)
}

#[plugin_fn]
pub fn fmt(args: String) -> FnResult<String> {
    let stdout = dag()
        .pipeline("fmt")?
        .pkgx()?
        .with_packages(vec!["deno"])?
        .with_exec(vec!["deno", "fmt", &args])?
        .stdout()?;
    Ok(stdout)
}

#[plugin_fn]
pub fn lint(args: String) -> FnResult<String> {
    let stdout = dag()
        .pipeline("lint")?
        .pkgx()?
        .with_packages(vec!["deno"])?
        .with_exec(vec!["deno", "lint", &args])?
        .stdout()?;
    Ok(stdout)
}

#[plugin_fn]
pub fn test(args: String) -> FnResult<String> {
    let stdout = dag()
        .pipeline("test")?
        .pkgx()?
        .with_packages(vec!["deno"])?
        .with_exec(vec![
            "deno",
            "test",
            "-A",
            "--coverage=coverage",
            "--lock-write",
            &args,
        ])?
        .stdout()?;
    Ok(stdout)
}

#[plugin_fn]
pub fn coverage() -> FnResult<String> {
    let stdout = dag()
        .pipeline("coverage")?
        .pkgx()?
        .with_packages(vec!["deno"])?
        .with_exec(vec!["deno coverage ./coverage --lcov > coverage.lcov"])?
        .stdout()?;
    Ok(stdout)
}

#[plugin_fn]
pub fn compile(args: String) -> FnResult<String> {
    let stdout = dag()
        .pipeline("compile")?
        .pkgx()?
        .with_packages(vec!["deno"])?
        .with_exec(vec!["deno", "compile", &args])?
        .stdout()?;
    Ok(stdout)
}

#[plugin_fn]
pub fn deploy(args: String) -> FnResult<String> {
    let stdout = dag()
        .pipeline("deploy")?
        .pkgx()?
        .with_packages(vec!["deno"])?
        .with_exec(vec![
            "deno",
            "install",
            "--allow-all",
            "--no-check",
            "-r",
            "-f",
            "--global",
            "https://deno.land/x/deploy/deployctl.ts",
        ])?
        .with_exec(vec!["deployctl", "deploy", &args])?
        .stdout()?;
    Ok(stdout)
}

#[plugin_fn]
pub fn publish(args: String) -> FnResult<String> {
    let stdout = dag()
        .pipeline("publish")?
        .pkgx()?
        .with_packages(vec!["deno"])?
        .with_exec(vec!["deno", "publish", &args])?
        .stdout()?;
    Ok(stdout)
}
