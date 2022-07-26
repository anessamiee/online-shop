import React, { useContext } from 'react'
import CartContext from '../../store/CartContext'

const Cart = () => {
  const cartCtx = useContext(CartContext)
  const length = cartCtx?.cartItems.length
  console.log('Cart render')
  return (
    <div className='flex items-center justify-center '>
      <div>Cart</div>
      {!!length && (
        <span className='ml-1 text-sm p-1 w-6 h-6 rounded-full bg-gray-900 text-white flex justify-center items-center'>
          {length}
        </span>
      )}
    </div>
  )
}
export default React.memo(Cart)
