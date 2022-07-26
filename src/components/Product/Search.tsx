import { useRef, useContext } from 'react'
import useAxios from '../../hooks/useAxios'
import ProductsContext from '../../store/ProductsContext'
import Button from '../UI/Button'

const Search = () => {
  const productCtx = useContext(ProductsContext)

  const inputRef = useRef<HTMLInputElement>(null)
  const selectRef = useRef<HTMLSelectElement>(null)

  const { response, error, loading } = useAxios<string[]>({
    method: 'GET',
    url: '/products/categories',
  })

  const options = [
    <option value={'All'} key={0}>
      All
    </option>,
  ]
  response?.data.map((cat, index) => {
    options.push(
      <option value={cat} key={index + 1}>
        {cat}
      </option>,
    )
  })

  const handleInput = () => {
    if (inputRef.current !== null && selectRef.current !== null) {
      const category = selectRef.current.value
      const title = inputRef.current.value
      productCtx.search(title, category)
    }
  }

  const handleClear = () => {
    if (!error) {
      if (inputRef.current !== null && selectRef.current !== null) {
        selectRef.current.value = 'All'
        inputRef.current.value = ''
      }
      handleInput()
    }
  }

  console.log('search render')

  return (
    <form
      className='w-full flex flex-col gap-4 sm:gap-8 sm:flex-row justify-start items-center'
      onSubmit={(e) => {
        e.preventDefault()
      }}
    >
      <input
        className='w-full border-2 rounded-lg px-4 py-2 border-gray-400 active:border-emerald-300 sm:w-1/2 lg:w-1/3'
        placeholder='Search'
        type='text'
        ref={inputRef}
        onChange={handleInput}
      />
      <select
        className='border-b-2 border-gray-300 px-4 py-2 w-full sm:w-1/2 lg:w-1/3'
        ref={selectRef}
        required
      >
        {error && <option value={error.message}>{error.message}</option>}
        {!error && !loading && options}
      </select>
      <Button className='w-full sm:w-auto' onClick={handleClear}>
        Reset
      </Button>
    </form>
  )
}
export default Search