import { ProductEntity } from '../../entities/product'
import { ProductRepository } from '../../interfaces/repositories/product-repository'
import { GetAllProductsUseCase } from '../../interfaces/use-cases/get-all-product-use-case'

export class GetAllProducts implements GetAllProductsUseCase {
  productRepository: ProductRepository
  constructor (productRepository: ProductRepository) {
    this.productRepository = productRepository
  }

  async execute (page: any): Promise<ProductEntity[] | null> {
    const result = await this.productRepository.getProducts(page)
    return result
  }
}
