import { useCallback, useContext } from 'react'
import ProductsContext from '../store/ProductsContext'
import { ProductsActions } from '../store/reducers/ProductsReducer'

const useProducts = () => {
  const { state, dispatch } = useContext(ProductsContext)
  const search = useCallback(
    (title: string, category: string) => {
      return dispatch({ type: ProductsActions.Filter, payload: { title, category } })
    },
    [dispatch],
  )
  const reset = useCallback(() => {
    return dispatch({ type: ProductsActions.Reset, payload: {} })
  }, [dispatch])
  const status = { loading: state.loading, error: state.error }
  const products = state.filteredProducts
  return { products, search, status, reset }
}
export default useProducts
