import { Route, Routes } from 'react-router-dom'
import Layout from './components/UI/Layout'
import Products from './pages/Products'
import ShoppingCart from './pages/ShoppingCart'

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Products />} />
        <Route path='/shopping-cart' element={<ShoppingCart />} />
      </Routes>
    </Layout>
  )
}

export default App
