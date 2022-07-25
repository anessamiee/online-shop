import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { CartContextProvider } from './store/cart-context'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <CartContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </CartContextProvider>,
)
