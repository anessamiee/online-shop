import React from 'react'

type Props = {
  className?: string
  children: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
  type?: 'button' | 'reset' | 'submit'
}
const Button: React.FC<Props> = ({ className, children, onClick, type }) => {
  return (
    <button
      className={
        'rounded-md bg-gray-500 text-gray-100 px-4 py-2 hover:bg-gray-400 hover:text-gray-900 hover:drop-shadow-xl transition-all ' +
        className
      }
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  )
}
export default React.memo(Button)
