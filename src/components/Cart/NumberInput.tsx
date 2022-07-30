import { forwardRef, MutableRefObject, useRef } from 'react'
import { IoAddCircle, IoRemoveCircle } from 'react-icons/io5'

type Props = {
  number: number
  onChange: () => void
}

const NumberInput = forwardRef<HTMLInputElement, Props>(({ number, onChange }, inputRef) => {
  const myRef = useRef() as MutableRefObject<HTMLInputElement>
  const handleAdd = () => {
    myRef.current.stepUp()
    onChange()
  }
  const handleRemove = () => {
    myRef.current.stepDown()
    onChange()
  }
  const handleRef = (element: HTMLInputElement) => {
    myRef.current = element
    if (typeof inputRef === 'function') {
      inputRef(element)
    } else if (inputRef) {
      inputRef.current = element
    }
  }

  return (
    <div className='flex flex-row items-center justify-evenly'>
      <button
        className='text-lg sm:text-xl drop-shadow-xl text-rose-800 hover:text-rose-700 transition-colors'
        onClick={handleRemove}
      >
        <IoRemoveCircle />
      </button>
      <input
        type='number'
        defaultValue={number === undefined ? 1 : number}
        className='text-center  w-1/3 group-even:bg-gray-100'
        ref={handleRef}
        min={1}
        onChange={onChange}
      />
      <button
        className='text-lg sm:text-xl drop-shadow-xl text-cyan-800 hover:text-cyan-700 transition-colors'
        onClick={handleAdd}
      >
        <IoAddCircle />
      </button>
    </div>
  )
})
NumberInput.displayName
export default NumberInput
