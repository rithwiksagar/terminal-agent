import readlineSync from "readline-sync";
import { agentloop } from "../agent/agent.js";
import { messages } from "../agent/state.js";
import { runtimecontext } from "./runtimecontext.js";






export async function runtime(){

  while(true){
  const runtimedetails = runtimecontext();
  messages.push({role: "developer", content: JSON.stringify(runtimedetails)})
  const userInput = readlineSync.question(">>>>>>>> ");
  messages.push({ role: "user", content: userInput });
  const response = await agentloop(messages);

  console.log(response)
  }
}