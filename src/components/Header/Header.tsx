import { useCallback, useEffect, useState } from 'react'
import Cart from './Cart'
import UserInfo from './UserInfo'
import { FiMenu } from 'react-icons/fi'
import useMediaQuery from '../../hooks/useMediaQuery'
import { Link, useLocation } from 'react-router-dom'
import useProducts from '../../hooks/useProducts'

const Header: React.FC = () => {
  const [mobile, setMobile] = useState(false)
  const [menu, setMenu] = useState(false)
  const { reset } = useProducts()
  const location = useLocation()
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

  const handleMenu = () => {
    setMenu((state) => !state)
  }

  const handleReset = useCallback(() => {
    if (location.pathname === '/') {
      reset()
    }
  }, [reset, location.pathname])

  const H1 = <h1 className='text-3xl font-medium '>Online Shop</h1>

  return (
    <header className='bg-gray-300 shadow-sm sm:px-16 px-8 py-6 sm:py-4 w-full text-2xl selection:bg-gray-400'>
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
        <Link to={'/shopping-cart'} onClick={handleReset}>
          <Cart />
        </Link>
      </nav>
    </header>
  )
}

export default Header
