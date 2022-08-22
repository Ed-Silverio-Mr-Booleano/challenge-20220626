import { ProductEntity } from '../../entities/product'

export interface GetAllProductsUseCase {
  execute(page: any): Promise<ProductEntity[] | null>
}
