import { useCallback, useContext } from 'react'
import CartContext from '../store/CartContext'
import { ActionTypes } from '../store/reducers/CartReducer'
import { Product } from '../types/Product'

const useCart = () => {
  const { state, dispatch } = useContext(CartContext)
  const cartTotalPrice = state.cartTotalPrice
  const cartProducts = state.products

  const addToCart = useCallback(
    (product: Product) => dispatch({ type: ActionTypes.Add, payload: { product } }),
    [dispatch],
  )
  const removeFromCart = useCallback(
    (id: number) => dispatch({ type: ActionTypes.Remove, payload: { id } }),
    [dispatch],
  )
  const updateQuantity = useCallback(
    (id: number, quantity: number) =>
      dispatch({ type: ActionTypes.Update, payload: { id, quantity } }),
    [dispatch],
  )
  return { cartProducts, cartTotalPrice, addToCart, removeFromCart, updateQuantity }
}
export default useCart
