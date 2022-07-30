import React, { useRef, useMemo, useCallback } from 'react'
import { GetAllCategories } from '../../api/categories'
import useProducts from '../../hooks/useProducts'
import Button from '../UI/Button'

const Search: React.FC = () => {
  const { search, reset } = useProducts()
  const inputRef = useRef<HTMLInputElement>(null)
  const selectRef = useRef<HTMLSelectElement>(null)
  const { response, error, loading } = GetAllCategories()
  const Options = useMemo(() => {
    return (
      <>
        <option value={'All'} key={0}>
          All
        </option>
        {response?.data.map((item: string, index) => {
          return (
            <option value={item} key={index}>
              {item}
            </option>
          )
        })}
      </>
    )
  }, [response?.data])

  const handleInput = useCallback(() => {
    if (inputRef.current !== null && selectRef.current !== null) {
      const category = selectRef.current.value
      const title = inputRef.current.value
      search(title, category)
    }
  }, [search])

  const handleClear = useCallback(() => {
    if (!error) {
      if (inputRef.current !== null && selectRef.current !== null) {
        selectRef.current.value = 'All'
        inputRef.current.value = ''
      }
      reset()
    }
  }, [error, reset])

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
        className='border-b-2 border-gray-300 px-4 py-2 w-full sm:w-1/2 lg:w-1/3 focus:outline-none focus:ring-0 appearance-non'
        ref={selectRef}
        onChange={handleInput}
        required
      >
        {error && <option value={error.message}>{error.message}</option>}
        {!error && !loading && Options}
      </select>
      <Button className='w-full sm:w-auto' onClick={handleClear}>
        Reset
      </Button>
    </form>
  )
}

export default React.memo(Search)
