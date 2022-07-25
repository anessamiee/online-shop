import { useCallback, useEffect, useMemo, useState } from 'react'
import Cart from './Cart'
import UserInfo from './UserInfo'
import { FiMenu } from 'react-icons/fi'
import useWindowDimensions from '../../hooks/useDemention'

const Header: React.FC = () => {
  const [mobile, setMobile] = useState(false)
  const [menu, setMenu] = useState(false)
  const { innerWidth } = useWindowDimensions()

  useEffect(() => {
    mobile ? setMenu(false) : setMenu(true)
  }, [mobile])
  useEffect(() => {
    if (innerWidth > 639) {
      setMobile(false)
    } else {
      setMobile(true)
    }
  }, [innerWidth])
//   useEffect(()=>{
// handleMenu()
//   },[])
//   const s = () => {
//     if (innerWidth > 639) {
//       setMobile(false)
//     } else {
//       setMobile(true)
//     }
//   }
//   const handleWindow = useCallback(() => {
//     s()
//   }, [])

  console.log('header render')
  const handleMenu = useCallback(() => {
    setMenu((state) => !state)
  }, [menu])
  return (
    <header className='text-gray-900 bg-gray-400 sm:px-16 px-8 py-4 text-2xl'>
      {mobile && (
        <div className='w-full flex items-center relative justify-center sm:top-0 sm:hidden'>
          <h1 className='sm:text-4xl font-medium'>Online Shop</h1>
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
        <h1 className='sm:text-3xl font-medium hidden sm:block absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 '>
          Online Shop
        </h1>
        <Cart />
      </nav>
    </header>
  )
}

export default Header