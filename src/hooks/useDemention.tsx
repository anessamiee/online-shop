import { useEffect, useState } from 'react'

type WindowDimentions = {
  innerWidth: number
  innerHeight: number
}
const useWindowDimensions = (): WindowDimentions => {
  const [windowDimensions, setWindowDimensions] = useState<WindowDimentions>({
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
  })
  function handleResize(): void {
    setWindowDimensions({
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
    })
  }
  useEffect(() => {
    // let timeoutId: NodeJS.Timeout
    // const resizeListener = () => {
    //   clearTimeout(timeoutId)
    //   timeoutId = setTimeout(() => handleResize(), 100)
    // }
    // window.addEventListener('resize', resizeListener)
    // return (): void => window.removeEventListener('resize', resizeListener)
    window.addEventListener('resize', handleResize)
    return (): void => window.removeEventListener('resize', handleResize)
  }, [windowDimensions])

  return windowDimensions
}

export default useWindowDimensions
