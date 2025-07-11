import { useState ,useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useTimer } from './useTimer'


function App() {
  const { count, start, stop, reset, isRunning } = useTimer();

  return (
    <>
      <h3>Timer: {count}</h3>
      <button onClick={start} disabled={isRunning}>Start</button>
      <button onClick={stop} disabled={!isRunning}>Stop</button>
      <button onClick={reset}>Reset</button>
    </>
  );
}

export default App
