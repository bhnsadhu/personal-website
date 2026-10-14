import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import './styles/tokens.css'
import './styles/base.css'
import './styles/cards.css'
import './styles/sections.css'
import './styles/pages.css'
import './styles/palette.css'
import './styles/motion.css'
import { installReveal } from './lib/motion'

installReveal()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
