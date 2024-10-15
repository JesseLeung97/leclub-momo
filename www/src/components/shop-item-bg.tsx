import styled from "styled-components"
import shopItemBg_0 from "../assets/shop_item_bg_0.png"
import shopItemBg_1 from "../assets/shop_item_bg_1.png"
import shopItemBg_2 from "../assets/shop_item_bg_2.png"
import shopItemBg_3 from "../assets/shop_item_bg_3.png"

const getBgImage = () => {
  const idx = Math.floor(Math.random() * 4)
  switch (idx) {
    case 0: return shopItemBg_0;
    case 1: return shopItemBg_1;
    case 2: return shopItemBg_2;
    case 3: return shopItemBg_3;
  }
}

const BgContainer = styled.img`
  position: absolute;
  border-radius: 999px;
  top: -1rem;
  left: -1rem;
  right: -1rem;
  bottom: -1rem;
  width: 100%;
  aspect-ratio: 1;
  z-index: -1;
`


export const ShopItemBg = () => {
  return (
    <BgContainer src={getBgImage()}/>
  )
}
