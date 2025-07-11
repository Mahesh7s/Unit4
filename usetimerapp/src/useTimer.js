// useTimer.js
import { useState, useEffect, useRef } from "react";

export function useTimer() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null); // holds the interval ID

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setCount(prev => prev + 1);
      }, 1000);
    }

    return () => clearInterval(timerRef.current); // cleanup on stop or unmount
  }, [isRunning]);

  const start = () => setIsRunning(true);

  const stop = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
  };

  const reset = () => {
    stop();
    setCount(0);
  };

  return { count, start, stop, reset, isRunning };
}
