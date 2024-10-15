import { createContext } from "preact"
import { FC } from "preact/compat"
import { useContext, useEffect, useState } from "preact/hooks"

const SpCheckContext = createContext<boolean>(false)

export const useSpCheck = () => {
  return useContext(SpCheckContext)
}

export const SpCheck: FC = ({ children }) => {
  const spCheckWidth = 999
  const [isSp, setIsSp] = useState(
    typeof window !== undefined ? window.innerWidth <= spCheckWidth : false,
  )

  const updateCheck = () => {
    if (typeof window !== undefined) {
      setIsSp(window.innerWidth <= spCheckWidth)
    }
  }

  useEffect(() => {
    window?.addEventListener("resize", updateCheck)
    return () => {
      window?.removeEventListener("resize", updateCheck)
    }
  }, [])

  return (
    <SpCheckContext.Provider value={isSp}>{children}</SpCheckContext.Provider>
  )
}
