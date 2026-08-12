import React, { useEffect, useState } from "react";
import { Box, Text, useInput } from "ink";

export function Header() {
  const [input, setInput] = useState("");

  useInput((char, key) => {
    if (key.return) {
      console.log(input);
      return;
    }

    if (key.backspace) {
      setInput(input.slice(0, -1));
      return;
    }

    setInput(input + char);
  });

  const [position, setPosition] = useState(0);

useEffect(() => {
  const timer = setInterval(() => {
    setPosition(previous => (previous + 1) % input.length);
  }, 100);

  return () => clearInterval(timer);
}, []);
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
          <Text>Windows · PowerShell</Text>
        </Box>

        <Box>
          <Text bold>Model </Text>
          <Text>OpenRouter</Text>
        </Box>
      </Box>

      <Box flexDirection="column" marginBottom={1}>
        <Text bold>Get started</Text>

        <Box marginTop={1}>
          <Text color="cyan">› </Text>
          <Text>Ask Hon to inspect, build, debug, or modify your code.</Text>
        </Box>
      </Box>

      <Box flexDirection="column">
        <Text dimColor>/help Commands</Text>
        <Text dimColor>/clear Clear conversation</Text>
        <Text dimColor>/exit Exit Hon</Text>
      </Box>

      <Box marginTop={1} padding={1} borderColor="whiteBright" borderStyle="round">
        <Text color="whiteBright">{input}</Text>
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
