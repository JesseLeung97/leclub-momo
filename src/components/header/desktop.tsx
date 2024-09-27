import styled from "styled-components"
import logoHorizontal from "../../assets/logo_horizontal.png"
import { PageLink } from "../page-link"
import { Insta } from "../icons/insta"
import { Link, useRoute } from "wouter-preact"

const Container = styled.header`
  height: 16rem;
  display: flex;
`

const Logo = styled.img`
  height: 10rem;
  margin: auto 0;
`

const NavContainer = styled.nav`
  display: flex;
  margin: auto 0 auto auto;
`

const LogoContainer = styled(Link)`
  height: fit-content;
  margin: auto 0;
`

export const DesktopHeader = () => {
  const [matchShop] = useRoute("/shop")
  const [matchAbout] = useRoute("/about")

  return (
    <Container>
      <LogoContainer to="/">
        <Logo src={logoHorizontal} />
      </LogoContainer>
      <NavContainer>
        <PageLink to="/shop" text="Shop" underline={matchShop} />
        <PageLink to="/about" text="About" underline={matchAbout} />
        <PageLink external to="/insta">
          <Insta />
        </PageLink>
      </NavContainer>
    </Container>
  )
}
