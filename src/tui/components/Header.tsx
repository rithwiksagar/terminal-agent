import { useEffect, useState } from "react";
import { Box, Text } from "ink";
import { Spinner, TextInput } from "@inkjs/ui";
import { runtime } from "../../cliruntime/runtime.js";
import type { chatMessages } from "../../types/types.js";
import { systeminfo } from "../../utils/systeminfo.js";
import cliSpinners from "cli-spinners";
import { Logo } from "./Logo.js";
import { Loader } from "./Loader.js";

export function Header() {
  const [inputKey, setInputKey] = useState<number>(0);
  const [isChatVisible, setIsChatVisible] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<chatMessages[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const environment = systeminfo();

  async function handleSubmit(value: string) {
    if (value === "") return;

    setChatMessages((messages) => [
      ...messages,
      { role: "user", content: value },
    ]);

    setInputKey((i) => i + 1);
    setIsChatVisible(true);
    setIsLoading(true);
    const response = await runtime(value);
    setChatMessages((messages) => [
      ...messages,
      { role: "agent", content: response },
    ]);
    setIsLoading(false);
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
        <Text dimColor>{environment.cwd}</Text>

        <Box marginTop={1}>
          <Text bold>Environment </Text>
          <Text color="gray">{environment.OS}</Text>
        </Box>
      </Box>

      {isChatVisible ? (
        <Box flexDirection="column">
          {chatMessages.map((message, index) => (
            <Box key={index} marginBottom={1}>
                <Text color={message.role === "agent" ? "cyan" : "whiteBright"}>
                  {"> "}
                  {message.content}
                </Text>
            </Box>
          ))}
          <Box marginBottom={1}>{isLoading && <Loader />}</Box>
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

