import { createContext, PropsWithChildren, useEffect, useMemo, useReducer } from 'react'
import { GetAllProducts } from '../api/products'
import {
  productReducer,
  ProductsAction,
  ProductsActions,
  ProductsState,
} from './reducers/ProductsReducer'

type ProductsContext = {
  state: ProductsState
  dispatch: React.Dispatch<ProductsAction>
}
const initalState: ProductsState = {
  allProducts: [],
  filteredProducts: [],
  loading: true,
  error: undefined,
}
const initialContext: ProductsContext = {
  state: initalState,
  dispatch: () => null,
}
const ProductsContext = createContext<ProductsContext>(initialContext)

export const ProductsContextProvider = (props: PropsWithChildren) => {
  const { response, error, loading } = GetAllProducts()

  const [state, dispatch] = useReducer(productReducer, initalState)

  useEffect(() => {
    if (response) {
      dispatch({
        type: ProductsActions.InitialState,
        payload: {
          products: response.data,
          loading,
          error,
        },
      })
    }
  }, [response, error, loading])
  const store = useMemo(() => ({ state, dispatch }), [state])
  return <ProductsContext.Provider value={store}>{props.children}</ProductsContext.Provider>
}
export default ProductsContext
