import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import App from './App.tsx'

// Apply stored theme before paint to avoid flash
const stored = localStorage.getItem('quasar-theme') || 'dark'
document.documentElement.setAttribute('data-theme', stored)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
