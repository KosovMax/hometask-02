const app = require('./../app')
const request = require('supertest')

const jwt = require('jsonwebtoken')
require('dotenv').config()
const { Auth, newAuth } = require('./../model/__mocks__/data')

const SECRET_KEY = process.env.JWT_SECRET
const issueToken = (payload, secret) => jwt.sign(payload, secret)
const token = issueToken({ id: Auth._id }, SECRET_KEY)
Auth.token = token

jest.mock('../model/contacts.js')
jest.mock('../model/auth.js')

describe('Testing the route api/auth', () => {
  it('should return 201 register', async (done) => {
    const res = await request(app)
      .post(`/auth/register`)
      .send(newAuth)
      .set('Accept', 'application/json')

    expect(res.status).toEqual(201)
    expect(res.body).toBeDefined()

    done()
  })

  it('should return 409 register -  email already used', async (done) => {
    const res = await request(app)
      .post(`/auth/register`)
      .send(newAuth)
      .set('Accept', 'application/json')

    expect(res.status).toEqual(409)
    expect(res.body).toBeDefined()

    done()
  })

  it('should return 200 login', async (done) => {
    const res = await request(app)
      .post(`/auth/login`)
      .send(newAuth)
      .set('Accept', 'application/json')

    expect(res.status).toEqual(200)
    expect(res.body).toBeDefined()

    done()
  })

  it('should return 401 login', async (done) => {
    const res = await request(app)
      .post(`/auth/login`)
      .send({ email: 'fail@tets.com', password: '123456' })
      .set('Accept', 'application/json')

    expect(res.status).toEqual(401)
    expect(res.body).toBeDefined()

    done()
  })

})
