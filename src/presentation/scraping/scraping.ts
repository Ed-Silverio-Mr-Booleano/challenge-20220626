import axios from 'axios'
import { load } from 'cheerio'

interface SecondPage {
  barcode: string
  quantity?: string
  packaging?: string
  brands?: string
  categories?: string
}
const url = 'https://world.openfoodfacts.org'

async function getProducts (): Promise<void> {
  await axios.get(url).then(response => {
    const $ = load(response.data)
    $('#search_results ul li').each((index, elem) => {
      if (index < 2) {
        console.log($(elem).find('a').attr('href').split('/')[2])
        console.log($(elem).find('a>span').text())
        console.log($(elem).find('div>img').attr('src'))
        console.log(url + $(elem).find('a').attr('href'))

        getProducts2(url).then(response => {
          return response
        })
        console.log('\n')
      }
    })
  }).catch(error => { console.log('error:', error) })
}

async function getProducts2 (url: any): Promise<SecondPage> {
  let barcode: any
  await axios.get(url).then(response => {
    const $ = load(response.data)
    barcode = $('#barcode_paragraph').text()
    console.log('barcode =>', barcode)
    console.log('quantity =>', $('#field_quantity_value').text())
    console.log('packaging =>', $('#field_packaging_value').text())
    console.log('brands =>', $('#field_brands_value').text())
    console.log('categories =>', $('#field_categories_value').text())
  })
  return barcode
}
getProducts()
