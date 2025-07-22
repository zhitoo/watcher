#!/usr/bin/env node

const chokidar = require("chokidar");
const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");

let debounceTimer = null;
const projectRoot = process.cwd();

const inputCommand = process.argv[2];
if (!inputCommand) {
  console.error(
    '❌ Error: No command provided.\nUsage: watcher "your-command-here"'
  );
  process.exit(1);
}

function readIgnorePatterns() {
  const ignoreFilePath = path.join(projectRoot, ".watcherignore");
  if (!fs.existsSync(ignoreFilePath)) return [];

  const lines = fs
    .readFileSync(ignoreFilePath, "utf-8")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));

  return lines.map(
    (pattern) =>
      new RegExp(
        `(^|[/\\\\])${pattern.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")}`
      )
  );
}

const ignoredPatterns = readIgnorePatterns();

console.log(
  "📁 Ignored paths from .watcherignore:",
  ignoredPatterns.map((r) => r.toString())
);
console.log(
  `🔁 Watching for file changes... Will run: \x1b[33m${inputCommand}\x1b[0m`
);

const watcher = chokidar.watch(".", {
  ignored: (filePath) => ignoredPatterns.some((regex) => regex.test(filePath)),
  persistent: true,
  ignoreInitial: true,
});

watcher.on("all", (event, filepath) => {
  console.log(`📌 ${event}: ${filepath}`);

  if (debounceTimer) clearTimeout(debounceTimer);

  debounceTimer = setTimeout(() => {
    console.log(`🚀 Executing: ${inputCommand}`);
    const cmd = exec(inputCommand);

    cmd.stdout.on("data", (data) => process.stdout.write(data));
    cmd.stderr.on("data", (data) => process.stderr.write(data));

    cmd.on("close", (code) => {
      if (code !== 0) {
        console.error(`❌ Command failed with exit code ${code}`);
      } else {
        console.log("✅ Done.");
      }
    });
  }, 1000);
});
