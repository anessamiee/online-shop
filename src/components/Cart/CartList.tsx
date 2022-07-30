import { Link } from 'react-router-dom'
import useCart from '../../hooks/useCart'
import Button from '../UI/Button'
import CartItem from './CartItem'

const CartList: React.FC = () => {
  const { cartProducts, cartTotalPrice, updateQuantity, removeFromCart } = useCart()
  if (!cartProducts.length) {
    return (
      <div className='text-base font-semibold flex flex-col items-center justify-center gap-8'>
        <h2 className='text-2xl'>Cart is Empty</h2>
        <Link to='/'>
          <Button>Back to Home &rarr;</Button>
        </Link>
      </div>
    )
  }

  return (
    <>
      <table className='table table-fixed w-full overflow-hidden text-sm font-medium text-center rounded-lg '>
        <thead className='md:text-base font-semibold text-gray-600 bg-gray-200 '>
          <tr className=''>
            <th className='sm:p-4 p-1 sm:table-cell hidden'>Number</th>
            <th className='sm:p-4 p-1'>Title</th>
            <th className='sm:p-4 p-1 md:table-cell hidden 2xl:w-1/3 xl:w-1/3 md:w-3/12 '>
              Description
            </th>
            <th className='sm:p-4 p-1 md:w-1/6 lg:w-auto sm:w-auto w-1/4'>Quantity</th>
            <th className='sm:p-4 p-1 sm:table-cell hidden'>Price</th>
            <th className='sm:p-4 p-1'>
              Total<span className='sm:hidden'>/Price</span>
            </th>
            <th className='sm:p-4 p-1 w-[10%]' />
          </tr>
        </thead>
        <tbody className='sm:text-sm text-xs divide-y divide-gray-200'>
          {cartProducts.map((item, index) => {
            return (
              <CartItem
                product={item.product}
                totalPrice={item.productTotalPrice}
                number={index + 1}
                quantity={item.quantity}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
                key={item.product.id}
              />
            )
          })}
        </tbody>
        <tfoot className='w-full table-footer-group text-center border-t-2 font-medium'>
          <tr>
            <td className='py-'>Total</td>
            <td className='sm:table-cell hidden' />
            <td className='md:table-cell hidden' />
            <td className='sm:table-cell hidden' />
            <td />
            <td colSpan={0}>{cartTotalPrice}$</td>
          </tr>
        </tfoot>
      </table>
    </>
  )
}
export default CartList
