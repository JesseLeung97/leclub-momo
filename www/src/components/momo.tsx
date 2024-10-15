import { FC } from "preact/compat"
import momo from "../assets/momo.png"
import styled from "styled-components"

const Square = styled.div`
  height: 224px;
  width: 224px;
  overflow: hidden;
  border-radius: 1000000px;
  border: 10px solid var(--lcm-green-new);
  background: var(--lcm-pink);
`

const Img = styled.img`
  width: 100%;
`

interface Props {
  round?: boolean
}

export const Momo: FC<Props> = ({ round }) => {
  return (
    <>
      {round && (
        <Square>
          <Img src={momo} />
        </Square>
      )}
      {!round && <img src={momo} />}
    </>
  )
}
