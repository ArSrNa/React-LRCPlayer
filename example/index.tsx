import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '../dist/index.css' // 此处引入css

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)