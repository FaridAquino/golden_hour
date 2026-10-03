import React from 'react'
import ReactDOM from 'react-dom/client'
import PaginaDos from './PaginaDos.jsx'
import './styles/global.css'
// El tema verde va después del global para pisar su fondo.
import './styles/parte2.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PaginaDos />
  </React.StrictMode>,
)
