import styled from "styled-components"
import { Header } from "./header/index"
import { FC } from "preact/compat"
import { useSpCheck } from "./sp-check"

const Container = styled.div`
  min-height: 100vh;
  max-width: 2000px;
  margin: 0 auto;
  padding: 0 5%;
  padding-bottom: 16rem;
`

const Children = styled.div<{ isSp: boolean }>`
  ${(props) => (props.isSp ? "margin-top: 10rem" : "")}
`

export const Layout: FC = ({ children }) => {
  const isSp = useSpCheck()

  return (
    <Container>
      <Header />
      <Children isSp={isSp}>{children}</Children>
    </Container>
  )
}
