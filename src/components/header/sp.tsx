import styled from "styled-components"
import logoHorizontal from "../../assets/logo_horizontal.png"
import { PageLink } from "../page-link"
import { Insta } from "../icons/insta"
import { Cart } from "../icons/cart"
import { Link, useLocation } from "wouter-preact"
import { useEffect, useState } from "preact/hooks"

const Container = styled.header<{ isOpen: boolean }>`
  position: fixed;
  width: 100vw;
  left: 0;
  top: 0;
  display: flex;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  background: var(--lcm-green);
  transition: all 0.3s ease-in-out;
  ${(props) => (props.isOpen ? "height: 100vh" : "height: 8rem;")}
`

const TopBar = styled.div`
  position: absolute;
  height: 8rem;
  width: 90%;
  margin: 0 5%;
  display: flex;
  justify-content: space-between;
`

const Content = styled.div<{ isOpen: boolean }>`
  position: absolute;
  margin: 0 5%;
  margin-top: 8rem;
  height: calc(100vh - 8rem);
  width: 90%;
  display: grid;
  place-items: center;
  transition: all 0.3s ease-in-out;
  opacity: ${(props) => (props.isOpen ? "100%" : "0")};
`

const Logo = styled.img`
  height: 4rem;
  margin: auto 0;
`

const NavContainer = styled.nav`
  height: fit-content;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 8rem;
  & > a {
    margin: 0 auto;
  }
`

const LogoContainer = styled(Link)`
  height: fit-content;
  margin: auto 0;
`

export const SpHeader = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [location] = useLocation()

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  return (
    <Container isOpen={isOpen}>
      <TopBar>
        <LogoContainer to="/">
          <Logo src={logoHorizontal} />
        </LogoContainer>
        <button onClick={() => setIsOpen(!isOpen)}>X</button>
      </TopBar>
      <Content isOpen={isOpen}>
        <NavContainer>
          <PageLink size="large" to="/shop" text="Shop" />
          <PageLink size="large" to="/about" text="About" />
          <PageLink external to="/insta">
            <Insta />
          </PageLink>
        </NavContainer>
      </Content>
    </Container>
  )
}
