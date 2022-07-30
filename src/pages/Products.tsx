import ProductsList from '../components/Product/ProductsList'
import Search from '../components/Product/Search'

const Products: React.FC = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full'>
      <Search />
      <ProductsList />
    </div>
  )
}
export default Products
