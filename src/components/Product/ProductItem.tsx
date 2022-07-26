import React from 'react'
import { Product } from '../../types/Product'
import Button from '../UI/Button'

type Props = {
  product: Product
  addToCart: (product: Product) => void
}

const ProductItem: React.FC<Props> = ({ product, addToCart }) => {
  const handleAddToCart = () => {
    addToCart(product)
  }

  return (
    <div className='w-full h-full py-6 flex flex-col items-center justify-start shadow-lg rounded-lg gap-4 '>
      <div className='relative w-full pt-[50%] overflow-hidden '>
        <img
          src={product.image}
          alt={product.title}
          className='absolute inset-0 w-full h-full object-contain'
          loading='lazy'
          decoding='async'
        />
      </div>
      <div className='px-4 flex flex-col h-full justify-between'>
        <section className='flex flex-col mt-4 mb-8 items-start justify-start h-2/3 '>
          <h2 className='text-lg mb-2 font-medium'>{product.title}</h2>
          <p className='text-base'>{product.description}</p>
        </section>
        <section className='flex items-end justify-between h-1/4'>
          <h3>{product.price}$</h3>
          <Button onClick={handleAddToCart}>Add to cart</Button>
        </section>
      </div>
    </div>
  )
}

export default React.memo(ProductItem)
