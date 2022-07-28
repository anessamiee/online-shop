import { useCallback, useEffect, useState } from 'react'
import Cart from './Cart'
import UserInfo from './UserInfo'
import { FiMenu } from 'react-icons/fi'
import useMediaQuery from '../../hooks/useMediaQuery'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
  const [mobile, setMobile] = useState(false)
  const [menu, setMenu] = useState(false)

  const minWidth = useMediaQuery('(min-width: 640px)')
  useEffect(() => {
    if (minWidth) {
      setMobile(false)
      setMenu(true)
    } else {
      setMobile(true)
      setMenu(false)
    }
  }, [minWidth])

  console.log('header render')
  const handleMenu = useCallback(() => {
    setMenu((state) => !state)
  }, [])
  const H1 = <h1 className='text-3xl font-medium '>Online Shop</h1>
  return (
    <header className='text-gray-900 bg-gray-400 sm:px-16 px-8 py-6 sm:py-4 text-2xl antialiased w-full'>
      {mobile && (
        <div className='w-full flex items-center relative justify-center sm:top-0 sm:hidden'>
          <Link to={'/'}>{H1}</Link>
          <FiMenu
            onClick={handleMenu}
            className={`text-3xl absolute right-0 transition-transform + ${menu && 'rotate-90'}`}
          />
        </div>
      )}
      <nav
        className={`w-full justify-between gap-4 items-center relative py-4 + ${
          menu ? 'flex' : 'hidden'
        }`}
      >
        <UserInfo />
        <Link
          to={'/'}
          className='hidden sm:block absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2'
        >
          {H1}
        </Link>
        <Link to={'/shopping-cart'}>
          <Cart />
        </Link>
      </nav>
    </header>
  )
}

export default Header
