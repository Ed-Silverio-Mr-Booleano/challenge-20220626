import fs from 'fs'
import path from 'path'

export async function load (): Promise<any> {
  let buffer: any
  fs.readFile(path.join(__dirname, 'products.json'), 'utf8', (error, data) => {
    if (error) throw error
    if (data) {
      buffer = JSON.parse(data)
    }
  })
  return buffer
}
export function save (content: any): void {
  fs.writeFile(path.join(__dirname, 'products.json'), JSON.stringify(content), err => {
    if (err) throw err
    console.log('done')
  })
}
