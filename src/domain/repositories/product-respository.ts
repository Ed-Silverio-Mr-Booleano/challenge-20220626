import { ProductDataSource } from '../../data/interfaces/data-source/product-data-source'
import { ProductEntity } from '../entities/product'
import { ProductRepository } from '../interfaces/repositories/product-repository'

export class ProductRepositoryImpl implements ProductRepository {
  productDataSource: ProductDataSource
  constructor (productDataSource) {
    this.productDataSource = productDataSource
  }

  async createProduct (products: ProductEntity[]): Promise<void> {
    await this.productDataSource.create(products)
  }

  async getProduct (code: number): Promise<ProductEntity> {
    const result = await this.productDataSource.getOne(code)
    return result
  }

  async getProducts (): Promise<ProductEntity[]> {
    const result = await this.productDataSource.getAll()
    return result
  }
}
