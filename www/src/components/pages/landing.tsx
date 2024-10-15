import styled from "styled-components"
import { useRoute } from "wouter-preact"
import landing_0 from "../../assets/landing/landing_0.jpeg"
import landing_1 from "../../assets/landing/landing_1.jpeg"
import landing_2 from "../../assets/landing/landing_2.jpeg"
import landing_3 from "../../assets/landing/landing_3.jpeg"
import landing_4 from "../../assets/landing/landing_4.jpeg"
import landing_5 from "../../assets/landing/landing_5.jpeg"
import landing_6 from "../../assets/landing/landing_6.jpeg"
import landing_7 from "../../assets/landing/landing_7.jpeg"
import landing_8 from "../../assets/landing/landing_8.jpeg"
import landing_9 from "../../assets/landing/landing_9.jpeg"
import landing_10 from "../../assets/landing/landing_10.jpeg"
import landing_11 from "../../assets/landing/landing_11.jpeg"
import landing_12 from "../../assets/landing/landing_12.jpeg"
import landing_13 from "../../assets/landing/landing_13.jpeg"
import landing_14 from "../../assets/landing/landing_14.jpeg"

const ItemsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
`

const Square = styled.img`
  aspect-ratio: 1;
  width: 100%;
`

const landingImages = [
  <Square src={landing_0} />,
  <Square src={landing_1} />,
  <Square src={landing_2} />,
  <Square src={landing_3} />,
  <Square src={landing_4} />,
  <Square src={landing_5} />,
  <Square src={landing_6} />,
  <Square src={landing_7} />,
  <Square src={landing_8} />,
  <Square src={landing_9} />,
  <Square src={landing_10} />,
  <Square src={landing_11} />,
  <Square src={landing_12} />,
  <Square src={landing_13} />,
  <Square src={landing_14} />,
]

export const Landing = () => {
  const [match] = useRoute("/")
  if (!match) return null

  const shuffledImages = landingImages
    .map((img) => ({ img, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ img }) => img)

  return (
    <ItemsContainer>
      { shuffledImages }
    </ItemsContainer>
  )
}
