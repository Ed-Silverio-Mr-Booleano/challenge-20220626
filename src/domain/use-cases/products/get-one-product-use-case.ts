import { ProductEntity } from '../../entities/product'
import { ProductRepository } from '../../interfaces/repositories/product-repository'
import { GetOneProductUseCase } from '../../interfaces/use-cases/get-one-product-use-case'

export class GetOneProduct implements GetOneProductUseCase {
  productRepository: ProductRepository
  constructor (productRepository: ProductRepository) {
    this.productRepository = productRepository
  }

  async execute (code: number): Promise<ProductEntity | null> {
    const result = await this.productRepository.getProduct(code)
    return result
  }
}
