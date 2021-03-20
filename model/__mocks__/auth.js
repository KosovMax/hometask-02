const { auths } = require('./data')
const bcrypt = require('bcryptjs')

const findByEmail = jest.fn((email) => {
  const [auth] = auths.filter((el) => String(el.email) === String(email))
  return auth
})

const findById = jest.fn((id) => {
  const [auth] = auths.filter((el) => String(el._id) === String(id))
  return auth
})

const create = jest.fn(({ email, password, subscription = 'free' }) => {
  const pass = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
  const newAuth = {
    email,
    password: pass,
    subscription,
    _id: '604a0fc3a7f1b801b4ea8985',
    validPassword: function (pass) {
      return bcrypt.compareSync(pass, this.password)
    },
  }
  auths.push(newAuth)
  return newAuth
})

const updateToken = jest.fn((id, token) => {
  return {}
})

const updateAvatar = jest.fn((id, avatar, imgIdCloud) => {
  return {}
})

module.exports = {
  findByEmail,
  findById,
  create,
  updateToken,
  updateAvatar,
}
