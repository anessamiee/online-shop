import { PropsWithChildren } from 'react'
import Header from '../Header/Header'
const Layout = (props: PropsWithChildren) => {
  return (
    <>
      <Header />
      <main className='text-gray-900'>{props.children}</main>
    </>
  )
}
export default Layout
