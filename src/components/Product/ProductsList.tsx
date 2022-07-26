import { useContext } from 'react'
import ProductsContext from '../../store/ProductsContext'
import { Product } from '../../types/Product'
import LoadingSpinner from '../UI/LoadingSpinner'
import ProductItem from './ProductItem'

const ProductsList: React.FC = () => {
  const productsCtx = useContext(ProductsContext)
  const products = productsCtx.products
  if (productsCtx.loading) {
    return <LoadingSpinner />
  }
  if (productsCtx.error) {
    return <h1 className='text-2xl text-red-400'>{productsCtx.error.message}</h1>
  }
  console.log('list render')
  return (
    <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 pt-16'>
      {products?.map((item: Product) => {
        return <ProductItem product={item} key={item.id} />
      })}
    </div>
  )
}
export default ProductsList
