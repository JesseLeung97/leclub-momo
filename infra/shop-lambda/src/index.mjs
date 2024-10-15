/* global fetch */

const token = process.env.SUZURI_TOKEN

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "*", 
  "Content-type": "application/json"
}

export const handler = async (event) => {
  try {
    if (event.path !== "/shop/items-by-series") {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "unknown api endpoint" }),
        headers: corsHeaders
      }
    }
    if (token === undefined) {
      throw new Error("Token is missing from env")
    }

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
    let itemsBySeries = {}

    if (json.products === undefined) {
      throw new Error("Missing products")
    }

    json.products.forEach((item) => {
      const title = item["title"]
      const price = item["price"]
      const link = item["sampleUrl"]
      const imageLink = item["pngSampleImageUrl"]
      const published = item["published"]
      const secret = item["secret"]

      if (
        title !== undefined &&
          price !== undefined &&
          link !== undefined &&
          imageLink !== undefined &&
          published !== undefined &&
          secret !== undefined
      ) {
        let series = "all"
        let itemName = title
        const parts = title.split("series")
        if (parts.length > 1) {
          series = parts[0].trim()
          itemName = parts[1].trim()
        }

        let seriesItems = itemsBySeries[series] ?? []
        let allItems = itemsBySeries["All"] ?? []
        let item = {
          title: itemName,
          price: `${price} JPY`,
          link: link,
          imageLink: imageLink
        }
        seriesItems.push(item)
        allItems.push(item)
        itemsBySeries[series] = seriesItems
        itemsBySeries["All"] = allItems
      }
    })

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        itemsBySeries: itemsBySeries
      })
    }
  } catch (err) {
    console.error(err)

    return {
      status: 500,
      headers: corsHeaders,
    }
  }
}
