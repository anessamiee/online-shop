import { Reducer } from 'react'
import { ActionMap } from '../../types/ActionMap'
import { Product } from '../../types/Product'
import { truncateNumber } from '../../utils/RoundNumber'

export enum ActionTypes {
  Add = 'ADD_TO_CART',
  Remove = 'REMOVE_FROM_CART',
  Update = 'UPDATE_CART',
}
type CartPayload = {
  [ActionTypes.Add]: {
    product: Product
  }
  [ActionTypes.Remove]: {
    id: number
  }
  [ActionTypes.Update]: {
    id: number
    quantity: number
  }
}
export type CartProduct = {
  product: Product
  quantity: number
  productTotalPrice: number
}
export type CartState = {
  products: CartProduct[]
  cartTotalPrice: number
  allProductsNo: number
}

export type CartAction = ActionMap<CartPayload>[keyof ActionMap<CartPayload>]
export const cartReducer: Reducer<CartState, CartAction> = (state, action) => {
  switch (action.type) {
    case ActionTypes.Add: {
      const newProduct = action.payload.product
      const id = newProduct.id
      let products = state.products
      if (!isItemExist(id, products)) {
        const product = newCartProduct(newProduct)
        products = [...products, product]
      } else if (isItemExist(id, products)) {
        products = updatedProducts(id, products, 1, true)
      }
      const cartTotalPrice = getCartTotalPrice(products)
      const allProductsNo = getAllProductsNo(products)
      return {
        products,
        cartTotalPrice,
        allProductsNo,
      }
    }
    case ActionTypes.Remove: {
      const products = [...state.products.filter((state) => state.product.id !== action.payload.id)]
      const cartTotalPrice = getCartTotalPrice(products)
      const allProductsNo = getAllProductsNo(products)
      return {
        products,
        cartTotalPrice,
        allProductsNo,
      }
    }
    case ActionTypes.Update: {
      const id = action.payload.id
      const quantity = action.payload.quantity
      const products = updatedProducts(id, state.products, quantity)
      const cartTotalPrice = getCartTotalPrice(products)
      const allProductsNo = getAllProductsNo(products)
      return {
        products,
        cartTotalPrice,
        allProductsNo,
      }
    }
    default:
      return state
  }
}
export const isItemExist = (id: number, state: CartProduct[]): boolean => {
  const newQuantityItem = state.find((item) => item.product.id === id)
  if (newQuantityItem === undefined) return false
  return true
}

const setProductTotalPrice = (price: number, quantity: number) => {
  const totalPrice = price * quantity
  return truncateNumber(totalPrice, 2)
}

const getCartTotalPrice = (state: CartProduct[]) => {
  let totalPrice = 0
  state.map((cart) => (totalPrice += cart.product.price * cart.quantity))
  return truncateNumber(totalPrice, 2)
}
const newCartProduct = (product: Product): CartProduct => {
  const quantity = 1
  const productTotalPrice = product.price
  return { product, quantity, productTotalPrice }
}
const getAllProductsNo = (state: CartProduct[]) => {
  let total = 0
  state.map((item) => (total += item.quantity))
  return total
}
const updatedProducts = (
  id: number,
  products: CartProduct[],
  quantity: number,
  addToCart = false,
) => {
  if (isItemExist(id, products) && quantity >= 1) {
    return [
      ...products.map((cart) => {
        if (cart.product.id === id) {
          addToCart && (quantity += cart.quantity)
          return {
            ...cart,
            quantity,
            productTotalPrice: setProductTotalPrice(cart.product.price, quantity),
          }
        }
        return cart
      }),
    ]
  }
  return products
}
