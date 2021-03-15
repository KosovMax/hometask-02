const app = require('./../app')
const request = require('supertest')

const jwt = require('jsonwebtoken')
require('dotenv').config()
const { Auth, newAuth } = require('./../model/__mocks__/data')

const SECRET_KEY = process.env.JWT_SECRET
const issueToken = (payload, secret) => jwt.sign(payload, secret)
const token = issueToken({ id: Auth._id }, SECRET_KEY)
Auth.token = token


// jest.mock('../model/contacts.js')
jest.mock('../model/auth.js')

describe('Testing the route users/', ()=>{
  describe('should handle get request', ()=>{

    it('should return 200 status for get current', async (done) =>{
      const res = await request(app)
          .get('/users/current')
          .set('Authorization', `Bearer ${token}`)
  
      expect(res.status).toEqual(200)
      expect(res.body).toBeDefined()
      expect(res.body.data).toBeInstanceOf(Object)
      done()
    })

  })

})