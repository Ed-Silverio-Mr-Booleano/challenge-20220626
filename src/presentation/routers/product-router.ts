import express, { Request, Response } from 'express'
import { GetAllProductsUseCase } from '../../domain/interfaces/use-cases/get-all-product-use-case'
import { GetOneProductUseCase } from '../../domain/interfaces/use-cases/get-one-product-use-case'
export default function ProductsRouter (
  getAllProductsUseCase: GetAllProductsUseCase,
  getOneProductsUseCase: GetOneProductUseCase
): express.Router {
  const router = express.Router()

  router.get('/', async (request: Request, response: Response) => {
    try {
      const products = await getAllProductsUseCase.execute()
      response.send(products)
    } catch (error) {
      console.log(error.message)
      response.status(500).send({ message: 'Error fetching data' })
    }
  })
  router.get('/:code', async (request: Request, response: Response) => {
    const code: number = Number.parseInt(request.params.code)
    const product = await getOneProductsUseCase.execute(code)
    response.send(product)
  })

  return router
}
