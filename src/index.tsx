import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { CartContextProvider } from './store/CartContext'
import { BrowserRouter } from 'react-router-dom'
import { ProductsContextProvider } from './store/ProductsContext'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <CartContextProvider>
    <ProductsContextProvider>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
    </ProductsContextProvider>
  </CartContextProvider>,
)
