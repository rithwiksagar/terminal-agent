import openrouter from "./providers/openrouter.js";
import {
  type ChatContentItems,
  type ChatMessages,
  type ChatSystemMessage,
  type ChatToolMessage,
} from "@openrouter/sdk/models";




export async function llmcall(messages: ChatMessages[] | ChatToolMessage[]) {
      const response = await openrouter.chat.send({
      chatRequest: {
        model: "nvidia/nemotron-3-super-120b-a12b:free",
        messages: messages,
        responseFormat: {
          type: "json_object",
        },
      },
    });
  return response
}

