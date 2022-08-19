/* eslint-disable import/no-duplicates */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import axios1 from 'axios'
import axios2 from 'axios'
import { load } from 'cheerio'

const url = 'https://world.openfoodfacts.org'
const ProductsFirstPage = []
async function getProducts (): Promise<void> {
  let code: number, productName: string, urlImg: string, urlP: string, productURL: string
  await axios1.get(url).then(response => {
    const $ = load(response.data)
    let counter = 0
    const qdt = $('search_results ul li').length

    $('#search_results ul li').map(async (index, elem) => {
      if (index < qdt) {
        code = Number.parseInt($(elem).find('a').attr('href').split('/')[2])
        productName = $(elem).find('a>span').text()
        urlImg = $(elem).find('div>img').attr('src')
        productURL = $(elem).find('a').attr('href')
        urlP = url + productURL
        await axios2.get(urlP).then(response => {
          const $2 = load(response.data)
          const barcode = $2('#barcode_paragraph').text().replace('\n', '').trim()
          const quantity = $2('#field_quantity_value').text()
          const packaging = $2('#field_packaging_value').text()
          const brands = $2('#field_brands_value').text()
          const categories = $2('#field_categories_value').text()

          ProductsFirstPage.push({
            code,
            product_name: productName,
            url: urlP,
            barcode,
            img_url: urlImg,
            quantity,
            packaging,
            brands,
            categories
          })
          counter++
          if (counter === qdt) return console.log('products =>', ProductsFirstPage)
        })
      }
    })
  }).catch(error => { console.log('error:', error) })
}

getProducts()
