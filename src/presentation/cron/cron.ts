/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/space-infix-ops */
import { CronJob } from 'cron'
import getProducts from '../scraping/scraping'
import { CreateProductUseCase } from '../../domain/interfaces/use-cases/create-product-use-case'

let count = 9
let url = 'https://world.openfoodfacts.org/' + count
export default function ProductCron (createProductUseCase: CreateProductUseCase): void {
  const job = new CronJob('0 0 0 * * *', async () => {
    await getProducts(url).then((response) => {
      if (response.length !== 0) {
        createProductUseCase.execute(response)
        console.log('Agendou')
        count++
        url = 'https://world.openfoodfacts.org/' + count
        console.log('count:', url)
      } else {
        console.log('resposta vazia')
      }
    })
  })
  job.start()
}
