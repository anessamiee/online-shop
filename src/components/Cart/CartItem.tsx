import { Product } from '../../types/Product'
import { FaTrashAlt } from 'react-icons/fa'
import { truncateNumber } from '../../utils/RoundNumber'
import NumberInput, { NumberInputHandle } from './NumberInput'
import { useContext, useEffect, useRef } from 'react'
import CartContext from '../../store/CartContext'
type Props = {
  product: Product
  number: number
  quantity: number
}
const CartItem: React.FC<Props> = ({ product, number, quantity }) => {
  const { updateQuantity } = useContext(CartContext)
  const total = truncateNumber(product.price * quantity, 2)
  const inputRef = useRef<NumberInputHandle>(null)
  const inputValue = inputRef.current?.getValue()
  useEffect(() => {
    // updateQuantity(inputValue as number, inputRef.current?.actionState())
  }, [inputValue, updateQuantity])
  console.log('cart item')
  return (
    <tr className='odd:bg-white even:bg-gray-100 font-medium text-ce'>
      <td className='sm:p-4 p-1 hidden sm:table-cell'>{number}</td>
      <td className='sm:p-4 p-1'>{product.title}</td>
      <td className='sm:p-4 p-1 md:table-cell hidden'>{product.description}</td>
      <td className='sm:p-4 p-1'>
        <NumberInput number={quantity} ref={inputRef} />
      </td>
      <td className='sm:p-4 p-1 sm:table-cell hidden'>{product.price}$</td>
      <td className='sm:p-4 p-1'>
        {total}$ <span className='sm:hidden text-gray-400'>{product.price}$</span>
      </td>
      <td className='sm:p-4 p-1 text-rose-800 drop-shadow-xl hover:text-rose-500 transition-colors'>
        <FaTrashAlt className='m-auto text-lg ' />
      </td>
    </tr>
  )
}
export default CartItem
