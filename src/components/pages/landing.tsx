import styled from "styled-components"
import { useRoute } from "wouter-preact"

const ItemsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
`

const randomColor = () => {
  var letters = "0123456789ABCDEF"
  var color = "#"
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

const Square = styled.div`
  aspect-ratio: 1;
`

export const Landing = () => {
  const [match] = useRoute("/")
  if (!match) return null

  return (
    <ItemsContainer>
      {[...Array(15)].map(() => (
        <Square style={{ background: randomColor() }} />
      ))}
    </ItemsContainer>
  )
}
