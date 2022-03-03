import { useState } from "react";

// Simple hook that manages the different components that need to be rendered by the Appointment component

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // Used to 'transition' Appointment elements from one 'mode' to another. This includes temporary error and confirmation messages as well as the more permanent displaying of interviews and empty appointment slots. Uses a 'replace' parameter to determine if the component that is being transitioned to should be stored in history so that it can be reached by the back function

  const transition = (newMode, replace = false) => {
    setMode(newMode);
    
    if (replace) {
      return setHistory(prev => ([...prev.slice(0, prev.length - 1), newMode]));
    }

    return setHistory(prev => [...prev, newMode]);
  }

  // Goes back to previous component being rendered by Appointment and removes the component being transitioned from from history

  const back = () => {
    if (history.length > 1) {
      let historyCopy = [...history];
      historyCopy.pop();
      setHistory(historyCopy)
      setMode(historyCopy[historyCopy.length - 1])
    }
  }

  return { mode, transition, back };
}