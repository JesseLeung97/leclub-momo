import { useSpCheck } from "../sp-check"
import { DesktopHeader } from "./desktop"
import { SpHeader } from "./sp"

export const Header = () => {
  const isSp = useSpCheck()

  return <>{isSp ? <SpHeader /> : <DesktopHeader />}</>
}
