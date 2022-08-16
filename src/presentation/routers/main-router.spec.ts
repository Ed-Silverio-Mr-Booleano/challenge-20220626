import server from '../../server'
import mainRouter from './main-router'
import request from 'supertest'

describe('Get / - a simple api endpoint', () => {
  beforeAll(() => {
    server.use('/', mainRouter())
  })
  beforeEach(() => {
    jest.clearAllMocks()
  })
  test('Should return Status: 200 and Message', async () => {
    const response = await request(server).get('/')
    expect(response.status).toBe(200)
    expect(response.body).toEqual({ message: 'Fullstack Challenge 20201026' })
  })
})
