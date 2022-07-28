import { useContext } from 'react'
import CartContext from '../../store/CartContext'
import { Product } from '../../types/Product'
import CartItem from './CartItem'

const CartList = () => {
  const { totalPrice, cartItems } = useContext(CartContext)
 console.log('cart list')
  return (
    <>
      <table className='table table-auto w-full overflow-hidden text-sm font-medium text-center rounded-lg '>
        <thead className='md:text-base font-semibold text-gray-600 bg-gray-200 '>
          <tr className=''>
            <th className='sm:p-4 p-1 sm:table-cell hidden'>Number</th>
            <th className='sm:p-4 p-1'>Title</th>
            <th className='sm:p-4 p-1 md:table-cell hidden'>Description</th>
            <th className='sm:p-4 p-1'>Quantity</th>
            <th className='sm:p-4 p-1 sm:table-cell hidden'>Price</th>
            <th className='sm:p-4 p-1'>
              Total<span className='sm:hidden'>/Price</span>
            </th>
            <th className='sm:p-4 p-1'></th>
          </tr>
        </thead>
        <tbody className='text-sm divide-y divide-gray-200'>
          {cartItems.map((item, index) => {
            return (
              <CartItem
                product={item.product}
                number={index + 1}
                quantity={item.quantity}
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
            <td colSpan={0}>{totalPrice}$</td>
          </tr>
        </tfoot>
      </table>
    </>
  )
}
export default CartList
