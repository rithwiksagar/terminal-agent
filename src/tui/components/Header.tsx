import React, { useEffect, useState } from "react";
import { Box, Text, useInput } from "ink";
import { TextInput } from "@inkjs/ui";
import { runtime } from "../../cliruntime/runtime.js";

type chatMessages = {
  role: "agent" | "user";
  content: string;
};
export function Header() {
  const [inputKey, setInputKey] = useState(0);
  const [response, setResponse] = useState<null | string>();
  const chatMessages: chatMessages[] = [];

  async function handleSubmit(value: string) {
    chatMessages.push({ role: "user", content: value });
    setInputKey((i) => i + 1);
    const response = await runtime(value);
    setResponse(response);
    chatMessages.push({ role: "agent", content: response });
  }

  return (
    <Box
      flexDirection="column"
      borderStyle="round"
      borderColor="gray"
      paddingX={2}
      paddingY={1}
      width="full"
    >
      <Box flexDirection="column" marginBottom={1}>
        <Text bold color="white">
          <Logo />
        </Text>

        <Text dimColor>Your coding agent in the terminal</Text>
      </Box>

      <Box
        flexDirection="column"
        borderStyle="single"
        borderColor="gray"
        paddingX={2}
        paddingY={1}
        marginBottom={1}
      >
        <Text bold>Workspace</Text>
        <Text dimColor>C:\Users\rithw\WorkingVolume\projects\TermAI</Text>

        <Box marginTop={1}>
          <Text bold>Environment </Text>
          <Text color="gray">Windows · PowerShell</Text>
        </Box>

        <Box>
          <Text bold>Model </Text>
          <Text color="gray">OpenRouter</Text>
        </Box>
      </Box>

      {response ? (
        <Box flexDirection="column">
          {chatMessages.map((message, index) => (
            <Box
              key={index}
              borderStyle="round"
              borderColor="gray"
              paddingX={1}
              marginBottom={1}
            >
              <Text>
                {message.role === "agent" ? "> " : "  "}
                {message.content}
              </Text>
            </Box>
          ))}
        </Box>
      ) : (
        <Box flexDirection="column" marginBottom={1}>
          <Text bold>Get started</Text>

          <Box marginTop={1}>
            <Text color="cyan">› </Text>
            <Text>Ask Hon to inspect, build, debug, or modify your code.</Text>
          </Box>
        </Box>
      )}

      <Box flexDirection="column">
        <Text dimColor>/help Commands</Text>
        <Text dimColor>/clear Clear conversation</Text>
        <Text dimColor>/exit Exit Hon</Text>
      </Box>

      <Box
        marginTop={1}
        borderColor="whiteBright"
        borderStyle="round"
        height={3}
        paddingLeft={1}
        width="100%"
        alignItems="center"
      >
        <TextInput
          key={inputKey}
          onSubmit={handleSubmit}
          placeholder="Type / for commands"
        />
      </Box>
    </Box>
  );
}

function Logo() {
  return `██╗  ██╗ ██████╗ ███╗   ██╗
██║  ██║██╔═══██╗████╗  ██║
███████║██║   ██║██╔██╗ ██║
██╔══██║██║   ██║██║╚██╗██║
██║  ██║╚██████╔╝██║ ╚████║
╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝`;
}
