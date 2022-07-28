import { useContext } from 'react'
import ProductsContext from '../../store/ProductsContext'
import { Product } from '../../types/Product'
import LoadingSpinner from '../UI/LoadingSpinner'
import ProductItem from './ProductItem'

const ProductsList: React.FC = () => {
  const { products, loading, error } = useContext(ProductsContext)
  if (loading) {
    return (
      <div className='p-32'>
        <LoadingSpinner />
      </div>
    )
  }
  if (error) {
    return (
      <div className='p-32'>
        <h1 className='text-2xl text-red-400 '>{error.message}</h1>
      </div>
    )
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
