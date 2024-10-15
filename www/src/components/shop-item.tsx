import styled from "styled-components"
import { PageLink } from "./page-link"
import { FC } from "preact/compat"
import { ShopItemBg } from "./shop-item-bg"

const Item = styled.div`
  position: relative;
  max-width: 360px;
`

const Image = styled.img`
  width: 100%;
`

const Label = styled.div`
  bottom: 0;
  left: 0;
`

const Price = styled.div`
  font-size: var(--font-very-very-small);
  color: var(--lcm-green-new);
`

const Name = styled.div`
  font-size: var(--font-very-small);
  line-height: 1;
`

export interface Props {
  name: string
  price: string
  link: string
  imageLink: string
}

export const ShopItem: FC<Props> = ({ name, price, link, imageLink }) => {
  return (
    <Item>
      <ShopItemBg />
      <PageLink to={link} external noPadding>
        <Image src={imageLink} />
        <Label>
          <Price>{price}</Price>
          <Name>{name}</Name>
        </Label>
      </PageLink>
    </Item>
  )
}
