import server from './server'
import ProductsRouter from './presentation/routers/product-router'
import mainRouter from './presentation/routers/main-router'
import { GetAllProducts } from './domain/use-cases/products/get-all-product-use-case'
import { CreateProduct } from './domain/use-cases/products/create-product-use-case'
import { ProductRepositoryImpl } from './domain/repositories/product-respository'
import { GetOneProduct } from './domain/use-cases/products/get-one-product-use-case'
import { MongoClient } from 'mongodb'
import { NoSQLDatabaseWrapper } from './data/interfaces/data-source/nosql-database-data-source'
import { MongoDBProductDataSource } from './data/data-sources/mongodb/mongodb-product-data-source'
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'
import swaggerFile from '../docs/api.json'
import ProductCron from './presentation/cron/cron'

dotenv.config()

const PORT = process.env.PORT || 3333

async function getMongoDS (): Promise<MongoDBProductDataSource> {
  const client: MongoClient = new MongoClient(process.env.URI)
  await client.connect()

  const db = client.db(process.env.DB)

  const productDatabase: NoSQLDatabaseWrapper = {
    find: (query, page) => db.collection(process.env.COLLECTION).find(query).limit(100).skip((Number.parseInt(page) - 1) * 100).toArray(),
    insertOne: (doc) => db.collection(process.env.COLLECTION).insertMany(doc),
    findOne: (query) => db.collection(process.env.COLLECTION).find(query).toArray()
  }

  return new MongoDBProductDataSource(productDatabase)
}
(async () => {
  const dataSource = await getMongoDS()

  const productMiddleware = ProductsRouter(
    new GetAllProducts(new ProductRepositoryImpl(dataSource)),
    new GetOneProduct(new ProductRepositoryImpl(dataSource))
  )
  ProductCron(new CreateProduct(new ProductRepositoryImpl(dataSource)))
  server.use('/products', productMiddleware)
  server.use('/', mainRouter())
  server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
  server.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`))
})()
