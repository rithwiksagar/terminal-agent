import { exec as execCallback } from "node:child_process";
import { promisify } from "node:util";






export async function executecommand(command: string) {
  if (command == undefined)
    return "executeCommand requires a non-empty string command";

  const exec = promisify(execCallback);
  try {
    const { stdout, stderr } = await exec(command, {
      shell: "powershell.exe",
    });

    return stdout;
  } catch (err) {
    console.log(err);
  }
}
