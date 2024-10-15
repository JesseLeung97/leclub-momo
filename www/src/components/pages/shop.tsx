import styled from "styled-components"
import { ShopItem } from "../shop-item"
import { useEffect, useState } from "preact/hooks"
import { useRoute } from "wouter-preact"
import { Spinner } from "../spinner"

const ItemsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 2rem;
`

const SeriesTabs = styled.div`
  display: flex;
  margin-bottom: 3rem;
`

const SeriesName = styled.div<{ isSelected: boolean }>`
  padding: 0.5rem 1rem;
  transition: var(--transition-default);
  font-weight: bold;
  border-bottom: ${props => props.isSelected ? "2px solid transparent" : "2px solid var(--lcm-green-new)"};
  background: ${props => props.isSelected ? "var(--lcm-green-new)" : "transparent"};
  color: ${props => props.isSelected ? "var(--lcm-purple-new)" : "inherit"};
  border-radius: 0.5rem 0.5rem 0 0;
  &:hover {
    color: ${props => props.isSelected ? "var(--lcm-purple-new)" : "var(--lcm-green-new)"};
    cursor: pointer;
  }
`

interface ItemRes {
  title: string,
  price: string,
  link: string,
  imageLink: string
}

const apiGatewayKey = "hNsylF8ZY7OGo7MJcHvp72IkS06AtDz5wdZe6YBa" as const

export const Shop = () => {
  const [match] = useRoute("/shop")
  if (!match) return null

  const [seriesItems, setSeriesItems] = useState<{ [key: string]: ItemRes[] }>({})
  const [isLoading, setIsLoading] = useState(false)
  const [selectedSeries, setSelectedSeries] = useState("")

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)

      const res = await fetch(
        "https://ecz7hg3cme.execute-api.us-east-1.amazonaws.com/v1/shop/items-by-series",
        {
          method: "GET",
          headers: {
            "x-api-key": apiGatewayKey,
          },
        },
      )

      const jsonRes: { 
        itemsBySeries: { 
          [key: string]: ItemRes[]
        }
      } = await res.json()

      setSeriesItems({ ...jsonRes.itemsBySeries })
      setSelectedSeries("All")
      setIsLoading(false)
    })()
  }, [])

  return (
    <>
      { isLoading
        ? (
          <Spinner />
        ) : (
          <>
            <SeriesTabs>
              { seriesItems && <SeriesName isSelected={selectedSeries === "All"} onClick={() => setSelectedSeries("All")}>All</SeriesName> }
              { seriesItems && Object.entries(seriesItems).map(([name, _]) => (
                name !== "All" ? <SeriesName isSelected={selectedSeries === name} onClick={() => setSelectedSeries(name)}>{name}</SeriesName> : <></>
              ))}
            </SeriesTabs>
            <ItemsContainer>
              { seriesItems && seriesItems[selectedSeries] && seriesItems[selectedSeries].map((item) => (
                <ShopItem 
                  name={item.title}
                  price={item.price}
                  link={item.link}
                  imageLink={item.imageLink}
                />
              ))}
            </ItemsContainer>
          </>
        )
      }
    </>
  )
}
