import * as fs from "fs";
import { exec, execSync } from "child_process";

const commitMessage = process.argv[2] ?? "Committing Today";
const commitCount = Number(process.argv[3]) ?? 5;

async function runConsoleCommand(command: string) {
  try {
    console.log(`running command: ${command}`);
    const output = execSync(command, { encoding: "utf-8" });
  } catch (error: any) {
    console.error(`Error: ${error.stderr}`);
    process.exit(error.code);
  }
}

function checkIfGitExists() {
  runConsoleCommand("git status");
}

function createGreenTilesFileOrAppendText() {
  fs.existsSync(".greentiles.txt")
    ? console.log("creating greentiles.txt file")
    : console.log("updating greetiles.txt");
  fs.appendFileSync(
    "greentiles.txt",
    `${commitMessage} - ${new Date().toLocaleString()}\n`
  );
}

function addAndCreateCommit() {
  // runConsoleCommand("git add .");
  runConsoleCommand(`git commit -am "${commitMessage}"`);
  console.log("commit created");
}

function pushCommit() {
   runConsoleCommand("git push");
}

async function run() {
  checkIfGitExists();
  createGreenTilesFileOrAppendText();
  addAndCreateCommit();
  pushCommit();
  console.log("green tiled");
  console.log("-----------------------------------");
}

for (let i = 1; i <= commitCount; i++) {
  run();
}
