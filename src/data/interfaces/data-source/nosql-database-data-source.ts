export interface NoSQLDatabaseWrapper {
  find(query: object, page: any): Promise<any[]>
  findOne(query: Object): Promise<any[]>
  insertOne(doc: any): void
}
