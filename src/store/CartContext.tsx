import React, { createContext, PropsWithChildren, ReactNode, useState } from 'react'
import { Product } from '../types/Product'

type CartContext = {
  cartItems: Product[]
  addToCart: (product: Product) => void
  removeFromCart: (id: number) => void
}
const CartContext = createContext<CartContext | null>(null)
const dummyItem = {
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
  const [cartItems, setCartItems] = useState<Product[]>([dummyItem])
  const addToCart = (product: Product) => {
    setCartItems((state) => [...state, product])
  }
  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }
  const value = React.useMemo(() => {
    return { cartItems, addToCart, removeFromCart }
  }, [cartItems, addToCart, removeFromCart])
  return <CartContext.Provider value={value}>{props.children}</CartContext.Provider>
}

export default CartContext
