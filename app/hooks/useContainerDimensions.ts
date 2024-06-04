import { RefObject, useEffect, useState } from "react"

const useContainerDimensions = (ref: RefObject<HTMLElement>) => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0, windowWidth: typeof window === "undefined" ? 0 : window.innerWidth })

    useEffect(() => {
      const getDimensions = () => ({
        width: ref.current?.offsetWidth || 0,
        height: ref.current?.offsetHeight || 0,
        windowWidth: window.innerWidth
      })
  
      const handleResize = () => {
        setDimensions(getDimensions())
      }
  
      if (ref.current) {
        setDimensions(getDimensions())
      }
  
      window.addEventListener("resize", handleResize)
  
      return () => {
        window.removeEventListener("resize", handleResize)
      }
    }, [ref])
  
    return dimensions;

}

export default useContainerDimensions