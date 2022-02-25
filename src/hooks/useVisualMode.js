import { useState } from "react";

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode) => {
    setMode(newMode);
    setHistory(prev => [...prev, newMode]);
  }

  const back = () => {
    history.pop();
    setMode(history[history.length - 1]);
  }

  console.log(history);
  console.log(mode);
  return { mode, transition, back };
}