const { contacts } = require('./data')

const getList = jest.fn(
  (authId, { sortBy, sortByDesc, filter, limit = '5', offset = '0' }) => {
    return { contacts, total: contacts.length, limit, offset }
  },
)

const getById = jest.fn((id, authId) => {
  const [contact] = contacts.filter((el) => String(el._id) === String(id))
  return contact
})

const create = jest.fn((body) => {
  const newContact = { ...body, _id: '604a0fc3a7f1b801b4ea8985' }
  contacts.push(newContact)
  return newContact
})

const update = jest.fn((id, body, authId) => {
  let [contact] = contacts.filter((el) => String(el._id) === String(id))
  if (contact) {
    contact = { ...contact, ...body }
  }
  return contact
})

const remove = jest.fn((id, authId) => {
  const index = contacts.findIndex((el) => String(el._id) === String(id))
  if (index === -1) {
    return null
  }
  const [contact] = contacts.splice(index, 1)
  return contact
})

module.exports = {
    getList,
    getById,
    remove,
    create,
    update,
}
