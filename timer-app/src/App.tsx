import React, { useEffect, useRef, useState } from 'react';

const App: React.FC = () => {
  const [seconds, setSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // ⏱️ Start the timer
  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }
  };

  // 🛑 Stop the timer
  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      setIsRunning(false);
    }
  };

  // 🔁 Reset the timer
  const resetTimer = () => {
    stopTimer();
    setSeconds(0);
  };

  // 🧹 Cleanup when component unmounts
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // 🕒 Format seconds to mm:ss
  const formatTime = (s: number) => {
    const minutes = Math.floor(s / 60);
    const seconds = s % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>⏰ Timer</h1>
      <h2 style={styles.time}>{formatTime(seconds)}</h2>
      <div>
        <button style={styles.button} onClick={startTimer} disabled={isRunning}>Start</button>
        <button style={styles.button} onClick={stopTimer} disabled={!isRunning}>Stop</button>
        <button style={styles.button} onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    textAlign: 'center',
    marginTop: '100px',
    fontFamily: 'Arial, sans-serif'
  },
  title: {
    fontSize: '2.5rem'
  },
  time: {
    fontSize: '3rem',
    margin: '20px 0'
  },
  button: {
    margin: '5px',
    padding: '10px 20px',
    fontSize: '1rem',
    cursor: 'pointer'
  }
};

export default App;
