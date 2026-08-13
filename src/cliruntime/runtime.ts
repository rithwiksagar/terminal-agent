import readlineSync from "readline-sync";
import { agentloop } from "../agent/agent.js";
import { messages } from "../agent/state.js";
import { runtimecontext } from "./runtimecontext.js";

export async function runtime(initialMessage: string) {
  while (true) {
    const runtimedetails = runtimecontext();
    messages.push({
      role: "developer",
      content: JSON.stringify(runtimedetails),
    });
    messages.push({role: "user", content: initialMessage});
    const response = await agentloop(messages);

    return response
  }
}
