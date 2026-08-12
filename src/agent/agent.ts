import { executecommand } from "../cliruntime/tools/executecommand.js";
import { llmcall } from "../llm/client.js";
import { messages } from "./state.js";

export async function agentloop(initialMessage: any[]) {
    

  while (true) {

    const response = await llmcall(initialMessage)
    if ("choices" in response) {
      const llmResponse = JSON.parse(
        response.choices[0]?.message.content as any,
      );
      messages.push({
        role: "assistant",
        content: JSON.stringify(llmResponse.content),
      });
      if (llmResponse.type == "action") {
        const observation = await executecommand(llmResponse.args.command);
        messages.push({ role: "assistant", content: observation });
      } else {
        return llmResponse.content;
      }
    }
  }
}

