import { ProductEntity } from '../../../domain/entities/product'

export interface ProductDataSource {
  create(product: ProductEntity[]): void
  getAll(): Promise<ProductEntity[] | null>
  getOne(code: number): Promise<ProductEntity | null>
}
