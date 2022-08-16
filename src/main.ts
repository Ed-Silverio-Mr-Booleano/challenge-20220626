import server from './server'
import ProductsRouter from './presentation/routers/product-router'
import { GetAllProducts } from './domain/use-cases/products/get-all-product-use-case'
import { ProductRepositoryImpl } from './domain/repositories/product-respository'
import { GetOneProduct } from './domain/use-cases/products/get-one-product-use-case'
import { MongoClient } from 'mongodb'
import { NoSQLDatabaseWrapper } from './data/interfaces/data-source/nosql-database-data-source'
import { MongoDBProductDataSource } from './data/data-sources/mongodb/mongodb-product-data-source'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 3333

async function getMongoDS (): Promise<MongoDBProductDataSource> {
  const client: MongoClient = new MongoClient(process.env.URI)
  await client.connect()

  const db = client.db(process.env.DB)

  const productDatabase: NoSQLDatabaseWrapper = {
    find: (query) => db.collection(process.env.COLLECTION).find(query).toArray(),
    insertOne: (doc) => db.collection(process.env.COLLECTION).insertOne(doc)
  }

  return new MongoDBProductDataSource(productDatabase)
}
(async () => {
  const dataSource = await getMongoDS()

  const productMiddleware = ProductsRouter(
    new GetAllProducts(new ProductRepositoryImpl(dataSource)),
    new GetOneProduct(new ProductRepositoryImpl(dataSource))
  )
  server.use('/products', productMiddleware)
  server.listen(PORT, () => console.log(`Running on hhtp://localhost:${PORT}`))
})()
