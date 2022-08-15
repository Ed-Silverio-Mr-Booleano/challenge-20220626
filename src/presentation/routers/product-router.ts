import express, { Request, Response } from 'express'
import { GetAllProductsUseCase } from '../../domain/interfaces/use-cases/get-all-product-use-case'
import { GetOneProductUseCase } from '../../domain/interfaces/use-cases/get-one-product-use-case'
export default function ProductsRouter (
  getAllProductsUseCase: GetAllProductsUseCase,
  getOneProductsUseCase: GetOneProductUseCase
): express.Router {
  const router = express.Router()

  router.get('', (request: Request, response: Response) => {
    response.status(200).send()
  })

  return router
}
