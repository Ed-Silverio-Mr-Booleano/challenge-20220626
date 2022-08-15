import express, { Request, Response } from 'express'
export default function mainRouter (): express.Router {
  const router = express.Router()

  router.get('/', (request: Request, response: Response) => {
    response.status(200).send()
  })
  return router
}
