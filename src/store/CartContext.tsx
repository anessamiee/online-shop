import { createContext, PropsWithChildren, useCallback, useEffect, useState } from 'react'
import { Product } from '../types/Product'
import { truncateNumber } from '../utils/RoundNumber'

type CartContext = {
  cartItems: Cart[]
  addToCart: (product: Product) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  totalPrice: number
}
const initialValues: CartContext = {
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  totalPrice: 0,
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
type Cart = { product: Product; quantity: number }

// const reducer = (state: Cart[], action: any) => {
//   switch (action.type) {
//     case 'ADD_CART':
//       return {
//         // contacts: [...state.contacts, action.payload],
//       }
//     case 'DEL_CART':
//       return {
//         // contacts: state.contacts.filter((contact) => contact.id !== action.payload),
//       }
//     case 'INCREASE_QUANTITY':
//       return {
//         loading: true,
//       }
//     case 'DECREASE_QUANTITY':
//       return {
//         loading: false,
//       }
//     default:
//       throw new Error()
//   }
// }

export const CartContextProvider = (props: PropsWithChildren) => {
  const [cartItems, setCartItems] = useState<Cart[]>([{ product: dummyItem, quantity: 2 }])
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    cartItems.map((item) =>
      setTotalPrice((price) => {
        const productTotalPrice = item.product.price * item.quantity
        const totalPrice = truncateNumber(productTotalPrice + price, 2)
        return totalPrice
      }),
    )
  }, [cartItems])

  const isItemExist = useCallback(
    (id: number): boolean => {
      const newQuantityItem = cartItems.find((item) => item.product.id === id)
      if (newQuantityItem === undefined) return false
      return true
    },
    [cartItems],
  )
  const updateQuantity = (id: number, quantity: number) => {
    if (isItemExist(id)) {
      if (quantity >= 1) {
        setCartItems((state) => {
          const newState = state.map((item) => {
            if (item.product.id === id) {
              //   if (action === CountAcion.decrease && item.quantity > 1) {
              console.log('updated')
              return { ...item, quantity: item.quantity - 1 }
            }
            return item
          })
          return newState
        })
      }
    }
  }
  // const i = useCallback(
  //   (id: number, action: CountAcion) => {
  //     if (id >= 1)
  //       if (!isItemExist(id)) {
  //         setCartItems((state) => {
  //           const newState = state.map((item) => {
  //             if (item.product.id === id) {
  //               if (action === CountAcion.increase) return { ...item, quantity: item.quantity + 1 }
  //               if (action === CountAcion.decrease && item.quantity > 1) {
  //                 console.log('updated')
  //                 return { ...item, quantity: item.quantity - 1 }
  //               }
  //             }
  //             return item
  //           })
  //           return newState
  //         })
  //         // console.log('updated')
  //       }
  //   },
  //   [isItemExist],
  // )
  const addToCart = useCallback(
    (product: Product) => {
      if (!isItemExist(product.id)) {
        const newCartItem: Cart = { product: product, quantity: 1 }
        setCartItems((state) => [...state, newCartItem])
        console.log('added')
      }
    },
    [isItemExist],
  )

  const removeFromCart = (id: number) => {
    // setCartItems(cartItems.filter((item) => item.id !== id))
  }

  console.log('cart context render')
  return (
    <CartContext.Provider
      value={{ cartItems, totalPrice, addToCart, updateQuantity, removeFromCart }}
    >
      {props.children}
    </CartContext.Provider>
  )
}

export default CartContext
