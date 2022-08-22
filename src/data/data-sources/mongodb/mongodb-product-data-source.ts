import { ProductEntity } from '../../../domain/entities/product'
import { ProductDataSource } from '../../interfaces/data-source/product-data-source'
import { NoSQLDatabaseWrapper } from '../../interfaces/data-source/nosql-database-data-source'

export class MongoDBProductDataSource implements ProductDataSource {
  private readonly db: NoSQLDatabaseWrapper
  constructor (db: NoSQLDatabaseWrapper) {
    this.db = db
  }

  async getOne (code: number): Promise<ProductEntity> {
    const result = await this.db.find({ code }, '')
    return result.map(item => ({
      code: item.code,
      barcode: item.barcode,
      status: item.status,
      imported_t: item.imported_t,
      url: item.url,
      product_name: item.product_name,
      quantity: item.quantity,
      categories: item.categories,
      packaging: item.packaging,
      brands: item.brands,
      image_url: item.image_url

    }))[0]
  }

  async getAll (page: string): Promise<ProductEntity[]> {
    const result = await this.db.find({}, page)
    return result.map(item => ({
      code: item.code,
      barcode: item.barcode,
      status: item.status,
      imported_t: item.imported_t,
      url: item.url,
      product_name: item.product_name,
      quantity: item.quantity,
      categories: item.categories,
      packaging: item.packaging,
      brands: item.brands,
      image_url: item.image_url

    }))
  }

  async create (product: ProductEntity[]): Promise<void> {
    await this.db.insertOne(product)
  }
}
