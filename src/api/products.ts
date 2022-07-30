import useAxios from '../hooks/useAxios'
import { Product } from '../types/Product'

export const GetAllProducts = () => {
  const { response, error, loading } = useAxios<Product[]>({
    method: 'GET',
    url: '/products',
    responseType: 'json',
  })
  return { response, error, loading }
}
export const GetSingleProduct = (productID: number) => {
  const { response, error, loading } = useAxios<Product>({
    method: 'GET',
    url: `/product/${productID}`,
    responseType: 'json',
  })
  return { response, error, loading }
}
