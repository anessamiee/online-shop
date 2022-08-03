import { createContext, PropsWithChildren, useMemo, useReducer } from 'react'
import { Product } from '../types/Product'
import { CartAction, cartReducer, CartState } from './reducers/CartReducer'

type CartContext = {
  state: CartState
  dispatch: React.Dispatch<CartAction>
}
const initialValues: CartContext = {
  state: { products: [], cartTotalPrice: 0, allProductsNo: 0 },
  dispatch: () => null,
}

const CartContext = createContext<CartContext>(initialValues)

const dummyItem: Product = {
  id: 1,
  title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
  price: 109.95,
  description:
    'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
  category: 'mens clothing',
  image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
  rating: { rate: 3.9, count: 120 },
}

export const CartContextProvider = (props: PropsWithChildren) => {
  const [state, dispatch] = useReducer(cartReducer, {
    products: [{ product: dummyItem, quantity: 2, productTotalPrice: dummyItem.price * 2 }],
    cartTotalPrice: dummyItem.price * 2,
    allProductsNo: 2,
  })
  const store = useMemo(() => ({ state, dispatch }), [state])
  return <CartContext.Provider value={store}>{props.children}</CartContext.Provider>
}

export default CartContext
