import { useEffect, useState } from "react";
import { Text } from "ink";


const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

export function Loader() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((current) => (current + 1) % frames.length);
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return <Text color="cyan">{frames[frame]} Thinking...</Text>;
}