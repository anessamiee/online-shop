import { Product } from '../../types/Product'
import { FaTrashAlt } from 'react-icons/fa'
import NumberInput from './NumberInput'
import React, { createRef } from 'react'

type Props = {
  product: Product
  number: number
  quantity: number
  totalPrice: number
  updateQuantity: (id: number, quantity: number) => void
  removeFromCart: (id: number) => void
}

const CartItem: React.FC<Props> = ({
  product,
  number,
  quantity,
  updateQuantity,
  removeFromCart,
  totalPrice,
}) => {
  const quantityRef = createRef<HTMLInputElement>()

  const handleQuantityChange = () => {
    const value = quantityRef.current?.valueAsNumber
    if (value) {
      updateQuantity(product.id, value)
    }
  }
  const handleDelete = () => {
    removeFromCart(product.id)
  }

  return (
    <tr className='odd:bg-white even:bg-gray-100 font-medium text-center group'>
      <td className='sm:p-4 p-1 hidden sm:table-cell'>{number}</td>
      <td className='sm:p-4 p-1 text-start '>{product.title}</td>
      <td className='sm:p-4 p-1 md:table-cell hidden text-justify'>{product.description}</td>
      <td className='sm:p-4 p-1 '>
        <NumberInput number={quantity} ref={quantityRef} onChange={handleQuantityChange} />
      </td>
      <td className='sm:p-4 p-1 sm:table-cell hidden'>{product.price}$</td>
      <td className='sm:p-4 p-1 '>
        {totalPrice}$
        <span className='sm:hidden text-gray-400'>
          <br />
          {product.price}$
        </span>
      </td>
      <td className='sm:p-4 p-1 text-rose-800 drop-shadow-xl hover:text-rose-500 transition-colors'>
        <FaTrashAlt className='m-auto text-lg' onClick={handleDelete} />
      </td>
    </tr>
  )
}

export default React.memo(CartItem)
