import { ProductEntity } from '../../entities/product'

export interface ProductRepository {
  createProduct(products: ProductEntity): void
  getProducts(): Promise<ProductEntity[]>
  getProduct(code: number): Promise<ProductEntity | null>
}
