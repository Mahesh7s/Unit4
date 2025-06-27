import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Theme from './ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Theme>
<App />

    </Theme>
    
  </StrictMode>,
)
