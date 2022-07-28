import { AxiosError } from 'axios'
import { createContext, PropsWithChildren, useEffect, useState, useCallback, useMemo } from 'react'
import useAxios from '../hooks/useAxios'
import { Product } from '../types/Product'
import { stringIncludes } from '../utils/StringIncludes'

type ProductsContext = {
  products: Product[]
  search: (title: string, category: string) => void
  loading: boolean
  error: AxiosError | undefined
}
const initialContext: ProductsContext = {
  products: [],
  search: () => {},
  loading: false,
  error: undefined,
}
const ProductsContext = createContext<ProductsContext>(initialContext)

export const ProductsContextProvider = (props: PropsWithChildren) => {
  const [productsState, setProductsState] = useState<Product[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const { response, error, loading } = useAxios<Product[]>({
    method: 'GET',
    url: '/products',
    responseType: 'json',
  })

  useEffect(() => {
    if (response) {
      setProducts(response.data)
      setProductsState(response.data)
    }
  }, [response])
  const search = useCallback(
    (title: string, category: string) => {
      if (category === 'All') {
        const serachedProducts = productsState.filter((item) => stringIncludes(item.title, title))
        setProducts(serachedProducts)
      }
      if (category !== 'All') {
        const serachedProducts = productsState.filter(
          (item) => stringIncludes(item.title, title) && item.category === category,
        )
        setProducts(serachedProducts)
      }
      if (title.trim().length === 0) {
        setProducts(productsState)
      }
    },
    [productsState],
  )
  console.log('product context render')
  return (
    <ProductsContext.Provider value={{ products, search, error, loading }}>
      {props.children}
    </ProductsContext.Provider>
  )
}
export default ProductsContext
