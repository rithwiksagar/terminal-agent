import { agentloop } from "../agent/agent.js";
import { messages } from "../agent/state.js";
import { systeminfo } from "../utils/systeminfo.js";

export async function runtime(initialMessage: string) {
  while (true) {
    const runtimedetails = systeminfo();
    messages.push({
      role: "developer",
      content: JSON.stringify(runtimedetails),
    });
    messages.push({role: "user", content: initialMessage});
    const response = await agentloop(messages);

    return response
  }
}
