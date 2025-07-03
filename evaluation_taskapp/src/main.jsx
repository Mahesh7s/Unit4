import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import TaskContext, { TaskCon } from './assets/Context/TaskContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <TaskContext>
<App />
    </TaskContext>
    
    </BrowserRouter>
    
  </StrictMode>,
)
