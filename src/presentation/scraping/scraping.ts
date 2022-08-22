/* eslint-disable eqeqeq */
/* eslint-disable import/no-duplicates */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import axios1 from 'axios'
import axios2 from 'axios'
import { load } from 'cheerio'
import moment from 'moment'
import { ProductEntity } from '../../domain/entities/product'
import { save } from '../stream/file'

// const url = 'https://world.openfoodfacts.org/4'

let Products = []
export default async function getProducts (url: any): Promise<ProductEntity[]> {
  const ProductsFirstPage = []
  // let code: number, productName: string, urlImg: string, urlP: string, productURL: string
  await axios1.get(url).then(response => {
    const $ = load(response.data)
    let counter = 0
    // const qtd = $('search_results ul li').html().length
    // console.log('qtd =>', qtd)

    $('#search_results ul li').each((index, elem) => {
      if (index < 2) {
        const code = Number.parseInt($(elem).find('a').attr('href').split('/')[2])
        const productName = $(elem).find('a>span').text()
        const urlImg = $(elem).find('div>img').attr('src')
        const productURL = $(elem).find('a').attr('href')
        const urlP = url.slice(0, 31) + productURL
        console.log('Url Product', productURL)
        console.log('urlP', urlP)
        axios2.get(urlP).then(response => {
          const $2 = load(response.data)
          const barcode = $2('#barcode_paragraph').text().replace('\n', '').trim()
          const quantity = $2('#field_quantity_value').text()
          const packaging = $2('#field_packaging_value').text()
          const brands = $2('#field_brands_value').text()
          const categories = $2('#field_categories_value').text()
          const CurrentDate = moment().format()

          ProductsFirstPage.push({
            code,
            product_name: productName,
            url: urlP,
            barcode,
            img_url: urlImg,
            quantity,
            packaging,
            brands,
            categories,
            imported_t: CurrentDate,
            status: 'imported'
          })
          counter++
          if (counter == 2) {
            Products = ProductsFirstPage
            console.log(ProductsFirstPage)
            save(ProductsFirstPage)
            return ProductsFirstPage
          }
        })
      }
    })
  }).catch(error => { console.log('error:', error) })
  return Products
}
