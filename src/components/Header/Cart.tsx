import React from 'react'
import useCart from '../../hooks/useCart'

const Cart: React.FC = () => {
  const { allProductsNo: length } = useCart()
  return (
    <div className='flex items-center justify-center '>
      <div>Cart</div>
      {!!length && (
        <span className='ml-1 text-sm p-1 w-7 h-7 rounded-full bg-gray-900 text-white flex justify-center items-center'>
          {length}
        </span>
      )}
    </div>
  )
}
export default React.memo(Cart)
