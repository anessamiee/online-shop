import CartList from '../components/Cart/CartList'
import useDocumentTitle from '../hooks/useDocumentTitle'

const ShoppingCart: React.FC = () => {
  useDocumentTitle('Shopping Cart')
  return <CartList />
}
export default ShoppingCart
