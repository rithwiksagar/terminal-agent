import readlineSync from "readline-sync";
import { agentloop } from "../agent-core/agentloop.js";
import { messages } from "../state/state.js";





export async function runtime(){

  while(true){
    const userInput = readlineSync.question(">>>>>>>> ");
  messages.push({ role: "user", content: userInput });
  const response = await agentloop(messages);

  console.log(response)
  }
}