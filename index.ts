import * as fs from "fs";
import { exec } from "child_process";

const commitMessage =  process.argv[2] ?? "Committing Today";
const commitCount = Number(process.argv[3]) ?? 5;

function runConsoleCommand(command: string) {
  try {
    console.log(`running command: ${command}`);
    const output = exec(command, { encoding: "utf-8" });
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
  fs.appendFileSync("greentiles.txt", `${commitMessage} - ${new Date().toLocaleString()}\n`);
}

function addAndCreateCommit() {
  runConsoleCommand("git add .");
  runConsoleCommand(`git commit -m "${commitMessage}"`);
  console.log("commit created");
}

async function pushCommit() {
  runConsoleCommand("git push -u origin main");
}

function run() {
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
