import { AxiosError } from 'axios'
import { createContext, PropsWithChildren, useEffect, useState, useCallback } from 'react'
import useAxios from '../hooks/useAxios'
import { Product } from '../types/Product'

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
      console.log(category)
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
    [products, productsState],
  )

  console.log('context render')
  return (
    <ProductsContext.Provider value={{ products, search, error, loading }}>
      {props.children}
    </ProductsContext.Provider>
  )
}
export default ProductsContext

const stringIncludes = (str1: string, str2: string): boolean => {
  if (str1.toLowerCase().includes(str2.toLowerCase())) {
    return true
  } else {
    return false
  }
}
