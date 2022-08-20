import { CronJob } from 'cron'
import getProducts from '../scraping/scraping'
import { CreateProductUseCase } from '../../domain/interfaces/use-cases/create-product-use-case'

export default function ProductCron (createProductUseCase: CreateProductUseCase): void {
  const job = new CronJob('*/30 * * * * *', async () => {
    console.log('Agendou')
    await getProducts().then((response) => {
      if (response.length !== 0) {
        createProductUseCase.execute(response)
      }
    })
  })
  job.start()
}
