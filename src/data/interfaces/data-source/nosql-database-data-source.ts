export interface NoSQLDatabaseWrapper {
  find(query: object): Promise<any[]>
  findOne(query: Object): Promise<any[]>
  insertOne(doc: any): void
}
