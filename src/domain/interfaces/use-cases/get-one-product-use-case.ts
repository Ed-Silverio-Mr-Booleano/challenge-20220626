import { ProductEntity } from '../../entities/product'

export interface GetOneProductUseCase {
  execute(code: number): Promise<ProductEntity | null>
}
