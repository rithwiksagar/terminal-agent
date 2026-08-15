import os from "node:os";
import process from "node:process";

export function systeminfo() {
  const osName: Record<string, string> = {
    win32: "Windows",
    linux: "Linux",
    darwin: "macOS",
  };

  return {
    OS: osName[process.platform] ?? process.platform,
    arch: os.arch(),
    homedir: os.homedir(),
    cwd: process.cwd(),
  };
}
