import { Route, Routes } from 'react-router-dom'
import Layout from './components/UI/Layout'
import Products from './pages/Products'

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Products />} />
      </Routes>
    </Layout>
  )
}

export default App
