import { Product } from '../../types/Product'
import LoadingSpinner from '../UI/LoadingSpinner'
import ProductItem from './ProductItem'
import useProducts from '../../hooks/useProducts'
import useCart from '../../hooks/useCart'

const ProductsList: React.FC = () => {
  const { products, status } = useProducts()
  const { addToCart } = useCart()

  if (status.loading) {
    return (
      <div className='p-32'>
        <LoadingSpinner />
      </div>
    )
  }
  if (status.error !== undefined) {
    return (
      <div className='p-32'>
        <h1 className='text-2xl text-red-400 '>{status.error.message}</h1>
      </div>
    )
  }

  return (
    <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 pt-16'>
      {products.map((item: Product) => {
        return <ProductItem product={item} addToCart={addToCart} key={item.id} />
      })}
    </div>
  )
}
export default ProductsList
