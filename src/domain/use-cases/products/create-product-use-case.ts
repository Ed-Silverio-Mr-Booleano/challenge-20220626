import { ProductEntity } from '../../entities/product'
import { ProductRepository } from '../../interfaces/repositories/product-repository'
import { CreateProductUseCase } from '../../interfaces/use-cases/create-product-use-case'

export class CreateProduct implements CreateProductUseCase {
  productRepository: ProductRepository
  constructor (ProductRepository: ProductRepository) {
    this.productRepository = ProductRepository
  }

  async execute (product: ProductEntity): Promise<void> {
    await this.productRepository.createProduct(product)
  }
}
