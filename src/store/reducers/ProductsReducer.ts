import { AxiosError } from 'axios'
import { Reducer } from 'react'
import { Product } from '../../types/Product'
import { stringIncludes } from '../../utils/StringIncludes'
import { ActionMap } from '../../types/ActionMap'

export enum ProductsActions {
  Filter = 'FILTER',
  Reset = 'RESET',
  InitialState = 'INITIAL_STATE',
}

type ProductPayload = {
  [ProductsActions.InitialState]: {
    products: Product[]
    error: AxiosError | undefined
    loading: boolean
  }
  [ProductsActions.Filter]: {
    title: string
    category: string
  }
  [ProductsActions.Reset]: Record<string, never>
}

export type ProductsState = {
  allProducts: Product[]
  filteredProducts: Product[]
  error: AxiosError | undefined
  loading: boolean
}
export type ProductsAction = ActionMap<ProductPayload>[keyof ActionMap<ProductPayload>]

export const productReducer: Reducer<ProductsState, ProductsAction> = (state, action) => {
  switch (action.type) {
    case ProductsActions.InitialState: {
      const newState = {
        allProducts: action.payload.products,
        filteredProducts: action.payload.products,
        error: action.payload.error,
        loading: action.payload.loading,
      }
      return newState
    }
    case ProductsActions.Filter: {
      const title = action.payload.title
      const category = action.payload.category
      if (category === 'All') {
        const serachedProducts = state.allProducts.filter((item) =>
          stringIncludes(item.title, title),
        )
        if (serachedProducts) {
          const newState: ProductsState = {
            allProducts: [...state.allProducts],
            filteredProducts: serachedProducts,
            loading: false,
            error: undefined,
          }
          return newState
        }
      }
      if (category !== 'All') {
        const serachedProducts = state.allProducts.filter(
          (item) => stringIncludes(item.title, title) && item.category === category,
        )
        return {
          allProducts: [...state.allProducts],
          filteredProducts: serachedProducts,
          loading: false,
          error: undefined,
        }
      }
      if (title.trim().length === 0) {
        return {
          allProducts: [...state.allProducts],
          filteredProducts: [...state.allProducts],
          loading: false,
          error: undefined,
        }
      }

      return state
    }
    case ProductsActions.Reset: {
      const newState = {
        allProducts: [...state.allProducts],
        filteredProducts: [...state.allProducts],
        loading: false,
        error: undefined,
      }
      return newState
    }
    default:
      return state
  }
}
