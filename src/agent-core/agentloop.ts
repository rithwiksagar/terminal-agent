import { GetWeather } from "../coding-cli/tools/getwheather.js";
import { llmcall } from "../llm/client.js";
import { messages } from "../state/state.js";

export async function agentloop(initialMessage: any[]) {
    

  while (true) {

    const response = await llmcall(initialMessage)

    if ("choices" in response) {
      const llmResponse = JSON.parse(
        response.choices[0]?.message.content as any,
      );
      messages.push({
        role: "assistant",
        content: JSON.stringify(llmResponse.content.content),
      });

      if (llmResponse.content.type == "action") {
        const observation = GetWeather(llmResponse.content.args);
        messages.push({ role: "assistant", content: observation });
      } else {
        return llmResponse.content.content;
      }
    }
  }
}

