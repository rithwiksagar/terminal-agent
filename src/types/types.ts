

export type chatMessages = {
  role: "agent" | "user";
  content: string;
};

export type Message = {
  role : "user" | "assistant" | "system" | "developer",
  content : string
}