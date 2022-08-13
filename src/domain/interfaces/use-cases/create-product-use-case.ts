import { ProductEntity } from '../../entities/product'

export interface CreateProductUseCase {
  execute(product: ProductEntity): void
}
