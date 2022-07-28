import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { IoAddCircle, IoRemoveCircle } from 'react-icons/io5'

type Props = {
  number: number
}
export type NumberInputHandle = {
  getValue: () => number
  setValue: (val: number) => void
}

const NumberInput = forwardRef<NumberInputHandle, Props>(({ number }, ref) => {
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>
  useImperativeHandle(ref, () => ({
    getValue: () => {
      return inputRef.current.valueAsNumber
    },
    setValue: (val: number) => {
      inputRef.current.valueAsNumber = val
    },
  }))
  const handleAdd = () => {
    inputRef.current.stepUp()
  }
  const handleRemove = () => {
    inputRef.current.stepDown()
  }
  return (
    <div className='flex flex-row items-center justify-evenly'>
      <button
        className='text-lg sm:text-xl drop-shadow-xl text-rose-800 hover:text-rose-700 transition-colors'
        onClick={handleRemove}
      >
        <IoRemoveCircle className='' />
      </button>
      <input
        type='number'
        defaultValue={number === undefined ? 1 : number}
        className='text-center  w-1/3'
        ref={inputRef}
        min={1}
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
