import { styled, keyframes } from "styled-components"

const PageCenter = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  place-items: center;
`

const Container = styled.div`
  height: 4rem;
  width: 4rem;
`

const keyframes_OeFQ = keyframes`
  0%{cx:4px;r:3px}
  50%{cx:9px;r:8px}
`

const Circle_mHwL = styled.circle`
  animation: ${keyframes_OeFQ} .75s cubic-bezier(0.56,.52,.17,.98) infinite;
  fill: var(--lcm-pink-new);
`

const keyframes_ZEPt = keyframes`
  0%{cx:15px;r:8px}
  50%{cx:20px;r:3px}
`

const Circle_ote2 = styled.circle`
  animation: ${keyframes_ZEPt} .75s cubic-bezier(0.56,.52,.17,.98) infinite;
  fill: var(--lcm-green-new);
`

export const Spinner = () => {
  return (
    <PageCenter>
    <Container>
      <svg width="100%" height="100%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="spinner-gF00">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="y"/>
            <feColorMatrix in="y" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7" result="z"/>
            <feBlend in="SourceGraphic" in2="z"/>
          </filter>
        </defs>
        <g filter="url(#spinner-gF00)">
          <Circle_mHwL cx="4" cy="12" r="3"/>
          <Circle_ote2 cx="15" cy="12" r="8"/>
        </g>
      </svg>
    </Container>
    </PageCenter>
  )
}
