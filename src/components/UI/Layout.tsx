import Header from '../Header/Header'

const Layout = (props: React.PropsWithChildren) => {
  return (
    <div className='flex flex-col h-screen text-gray-900 antialiased'>
      <Header />
      <main className='sm:px-16 px-8 py-8 sm:py-12 selection:bg-gray-300 flex flex-col items-center justify-start w-full overflow-y-auto flex-1'>
        {props.children}
      </main>
    </div>
  )
}
export default Layout
