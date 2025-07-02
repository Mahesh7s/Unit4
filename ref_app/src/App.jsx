import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  let inputRef = useRef(null);
    const [focused, setFocused] = useState(false); // 2️⃣ track focus state

function focus(){
  inputRef.current.focus()
  inputRef.current.style.backgroundColor = "#ffbbbb"; // 4️⃣ change bg
      setFocused(true);  
}

  return (
    <>
<h1>HEy I'm using USEREF App</h1>
<input type="text" ref={inputRef} placeholder='Enter some text here'/>
<button onClick={focus}>click me to focus on the input</button>
{focused && (
        <p style={{ color: "#2e7d32", marginTop: "8px" }}>Focused!</p>
      )}
    </>
  )
}

export default App
