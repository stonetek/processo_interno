import React from 'react'
import ReactDOM from 'react-dom/client'
import './global.css'
import Routers from './Routes.tsx'
import { BondProvider } from './context/BondContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BondProvider>
      <Routers/>
    </BondProvider>  
  </React.StrictMode>,
)
