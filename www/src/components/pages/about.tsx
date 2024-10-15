import styled from "styled-components"
import { useRoute } from "wouter-preact"
import { PageLink } from "../page-link"
import { Momo } from "../momo"

const Container = styled.div`
  display: flex;
  gap: 12%;
  @media (max-width: 999px) {
    flex-direction: column;
    gap: unset;
  }
`

const BioContainer = styled.div`
  width: 54%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  @media (max-width: 999px) {
    width: 100%;
    margin-bottom: 2rem;
  }
`

const BioTitle = styled.h1`
  font-size: var(--font-large);
  font-weight: bold;
  margin: 2rem 0;
`

const Bio = styled.div`
  font-size: var(--font-small);
`

const Contact = styled.div`
  width: 34%;
  display: flex;
  flex-direction: column;
  @media (max-width: 999px) {
    width: 100%;
  }
`

const ContactSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  @media (max-width: 999px) {
    margin-bottom: 1rem;
  }
`

const SectionTitle = styled.h1`
  font-size: var(--font-medium);
  font-weight: bold;
`

const Artist = styled.div`
  @media (max-width: 999px) {
    margin: 0 auto;
  }
`

export const About = () => {
  const [match] = useRoute("/about")
  if (!match) return null

  return (
    <Container>
      <BioContainer>
        <Artist>
          <Momo round />
        </Artist>
        <Bio>
          <BioTitle>Welcome to Le Club Momo</BioTitle>
          <p>
            Heyheymomo is a little series of comics I always wanted to make.
            Four panels at most, super light hearted, cute and wholesome. Enough
            to hopefully bring a little smile on people’s faces.
          </p>
          <p>
            Most of them revolve around two characters, a little dog named Momo
            and his best froggy friend named Forg. They love each other lots,
            and find themselves in silly and weird situations. They might not be
            the smartest little guys around but they always have the right
            intentions in mind.
          </p>
          <p>Thank you for reading my comic and supporting my ideas ❤️</p>
          <p>
            It’s my ultimate dream to make Hey Hey Momo a daily comic. If you’d
            like to contribute in making this dream a reality, please consider
            supporting me on Patreon? It would mean THE WORLD to me
          </p>
        </Bio>
      </BioContainer>
      <Contact>
        <ContactSection>
          <SectionTitle>Email</SectionTitle>
          <PageLink
            external
            noPadding
            heavy={false}
            size="small"
            to="mailto:momo@leclubmomo.cc"
          >
            momo@leclubmomo.cc
          </PageLink>
        </ContactSection>
        <ContactSection>
          <SectionTitle>Follow</SectionTitle>
          <PageLink
            external
            noPadding
            heavy={false}
            size="small"
            to="instagram.com/leclub_momo"
          >
            Instagram
          </PageLink>
        </ContactSection>
      </Contact>
    </Container>
  )
}
