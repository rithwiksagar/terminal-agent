import { exec as execCallback } from "node:child_process";
import { promisify } from "node:util";

export async function executecommand(command: string): Promise<string> {
  if (command == undefined)
    return "executeCommand requires a non-empty string command";

  const exec = promisify(execCallback);
  try {
    const { stdout, stderr } = await exec(command, {
      shell: "powershell.exe",
    });

    return stdout;
  } catch (err) {
    return `Command execution failed: ${String(err)}`;
  }
}
