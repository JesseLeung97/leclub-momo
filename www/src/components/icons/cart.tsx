import styled from "styled-components"

const IconContainer = styled.div`
  height: 30px;
  width: 30px;
  text-align: center;
`

const st0 = `
  fill: none;
  stroke: #6946ce;
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-miterlimit: 10;
`

const st3 = `
  fill: none;
`

const Path = styled.path`
  ${st0}
`
const Line = styled.line`
  ${st0}
`
const Rect = styled.rect`
  ${st3}
`

export const Cart = () => {
  return (
    <IconContainer>
      <svg version="1.1" viewBox="0 0 32 32" fill="#6946ce" stroke="#6946ce">
        <g stroke-width="1"></g>
        <g stroke-linecap="round" stroke-linejoin="round"></g>
        <g>
          <Path
            class="st0"
            d="M3,14h8l3.4-7.9c0.3-0.7,1-1.1,1.8-1.1h7.1c0.7,0,1.2,0.8,0.9,1.4L21,14"
          />
          <Line class="st0" x1="11" y1="14" x2="29" y2="14" />
          <Path
            class="st0"
            d="M22.4,27H9.6c-1.5,0-2.7-1.1-3-2.5L5,14h22l-1.6,10.5C25.2,25.9,23.9,27,22.4,27z"
          />
          <Rect x="-72" y="-72" class="st3" width="536" height="680" />
        </g>
      </svg>
    </IconContainer>
  )
}
