import request from 'supertest'
import { GetAllProductsUseCase } from '../../domain/interfaces/use-cases/get-all-product-use-case'
import { GetOneProductUseCase } from '../../domain/interfaces/use-cases/get-one-product-use-case'
import ProductsRouter from './product-router'
import server from '../../server'
import { ProductEntity } from '../../domain/entities/product'

class MockGetAllProductsUseCase implements GetAllProductsUseCase {
  async execute (): Promise<ProductEntity[]> {
    throw new Error('Methid not implemented')
  }
}
class MockGetOneProductUseCase implements GetOneProductUseCase {
  async execute (code: number): Promise<ProductEntity> {
    throw new Error('Method not implemented')
  }
}
describe('Product Router', () => {
  let mockGetAllProductsUseCase: GetAllProductsUseCase
  let mockGetOneProductsUseCase: GetOneProductUseCase

  beforeAll(() => {
    mockGetAllProductsUseCase = new MockGetAllProductsUseCase()
    mockGetOneProductsUseCase = new MockGetOneProductUseCase()
    server.use('/products', ProductsRouter(mockGetAllProductsUseCase, mockGetOneProductsUseCase))
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET /products', () => {
    test('Should return 200 with data', async () => {
      const ExpectedData = [{
        code: 3661112502850,
        barcode: '3661112502850(EAN / EAN-13)',
        status: 'imported',
        imported_t: '2020-02-07T16:00:00Z',
        url: 'https://world.openfoodfacts.org/product/3661112502850',
        product_name: 'Jambon de Paris cuit à',
        quantity: '240 g',
        categories: 'Meats, Prepared meats, Hams, White hams',
        packaging: 'Film en plastique, Film en plastique',
        brands: 'Tradilège, Marque Repère',
        image_url: 'https://static.openfoodfacts.org/images/products/366/111/250/2850/front_fr.3.400.jpg'
      }]
      jest.spyOn(mockGetAllProductsUseCase, 'execute').mockImplementation(async () => await Promise.resolve(ExpectedData))
      const response = await request(server).get('/products')
      expect(response.status).toBe(200)
      expect(mockGetAllProductsUseCase.execute).toBeCalledTimes(1)
      expect(response.body).toStrictEqual(ExpectedData)
    })
  })
})
