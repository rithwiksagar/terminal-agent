import { exec as execCallback } from "node:child_process";
import { promisify } from "node:util";


export async function executecommand(command: string) {
  console.log(command)
  const exec = promisify(execCallback)
try {
  const {stdout, stderr} = await exec(command,{
    shell: "powershell.exe"
  });
  return stdout;
}
catch(err){
  console.log(err);
}
}
