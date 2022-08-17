import axios from 'axios'
import cheerio from 'cheerio'

const url = 'https://world.openfoodfacts.org/'

async function getProducts (): Promise<void> {
  const { data } = await axios.get(url)
  const $ = cheerio.load(data)

  const name = $('#search_results #products_tabs_content #products_all ul#products_match_all li a div.list_product_name').text()
  console.log(name)
}
getProducts()
