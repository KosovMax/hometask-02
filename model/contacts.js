const db = require('./db')
const {v4:uuid} = require('uuid');

const dbGetContacts = db.get('contacts');

const getList = async () => {
    return dbGetContacts.value();
}

const getById = async (id) => {
    return dbGetContacts.find({id}).value();
}

const remove = async (id) => {
    const [record] = dbGetContacts.remove({id}).write();
    return record;
}

const create = async (body) => {
    const id = uuid();
    const record = {
        id, 
        ...body
    }
    dbGetContacts.push(record).write();
    return record;
}

const update = async (id, body) => {
    const record = dbGetContacts.find({id}).assign(body).value();
    db.write();

    return record;
}

module.exports = {
    getList,
    getById,
    remove,
    create,
    update,
}