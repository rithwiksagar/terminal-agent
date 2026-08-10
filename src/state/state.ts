import type { ChatMessages } from "@openrouter/sdk/models";
import { SYSTEM_PROMPT } from "./systemprompt.js";


export const messages: ChatMessages[] = [
  {
    role: "system",
    content: SYSTEM_PROMPT,
  },
];