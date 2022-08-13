import { ProductEntity } from '../../entities/product'

export interface GetAllProductsUseCase {
  execute(): Promise<ProductEntity[]>
}
