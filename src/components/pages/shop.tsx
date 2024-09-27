import styled from "styled-components"
import { ShopItem } from "../shop-item"
import { useEffect, useState } from "preact/hooks"
import { useRoute } from "wouter-preact"

const ItemsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 2rem;
`

const token = "FnhKP7Gkvi9tPmUjkIjoAE3sBhVYlJ5YbfKxOyzqeAM" as const

export const Shop = () => {
  const [match] = useRoute("/shop")
  if (!match) return null

  const [shopItems, setItems] = useState([])

  useEffect(() => {
    ;(async () => {
      const res = await fetch(
        "https://suzuri.jp/api/v1/products?userName=LeClub_momo",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      const json = await res.json()
      console.log(json.products)

      setItems(json.products ?? [])
    })()
  }, [])

  return (
    <ItemsContainer>
      {shopItems.map((item) => (
        <ShopItem
          name={item["title"] ?? ""}
          type={item["item"]["name"] ?? ""}
          link={item["sampleUrl"] ?? ""}
          imageLink={item["pngSampleImageUrl"] ?? ""}
        />
      ))}
    </ItemsContainer>
  )
}
