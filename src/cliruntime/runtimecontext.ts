import os from "node:os"


export function runtimecontext(){
    const environment = {
        OS : os.platform(),
        arch: os.arch(),
        homedir: os.homedir(),
        cwd: process.cwd()
    }

    return environment;
}