import { PropsWithChildren } from 'react'
import Header from '../Header/Header'
const Layout = (props: PropsWithChildren) => {
  return (
    <>
      <Header />
      <main className='text-gray-900 sm:px-16 px-8 py-4 antialiased selection:bg-gray-300'>{props.children}</main>
    </>
  )
}
export default Layout
