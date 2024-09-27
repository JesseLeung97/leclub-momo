import styled from "styled-components"
import { PageLink } from "./page-link"
import { FC } from "preact/compat"

const Item = styled.div`
  position: relative;
  max-width: 360px;
  overflow: hidden;
`

const Image = styled.img`
  width: 100%;
`

const Label = styled.div`
  bottom: 0;
  left: 0;
`

const Type = styled.div`
  font-size: var(--font-very-very-small);
  color: var(--lcm-beige);
`

const Name = styled.div`
  font-size: var(--font-very-small);
  line-height: 1;
`

export interface Props {
  name: string
  type: string
  link: string
  imageLink: string
}

export const ShopItem: FC<Props> = ({ name, type, link, imageLink }) => {
  return (
    <Item>
      <PageLink to={link} external noPadding>
        <Image src={imageLink} />
        <Label>
          <Type>{type}</Type>
          <Name>{name}</Name>
        </Label>
      </PageLink>
    </Item>
  )
}
