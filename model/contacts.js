const Contact = require('./schemas/contacts')
const { ObjectID } = require('mongodb');


const getList = async (authId, {sortBy, sortByDesc, filter, limit = "2", offset = "0"}) => {
//    const results = await Contact.find({owner: authId}).populate({
//        path:'owner',
//        select: 'email subscription -_id'
//    })
   const results = await Contact.paginate(
       {owner: authId}, 
            {
                limit, 
                offset,
                sort: { 
                    ...(sortBy ? { [`${sortBy}`]:1 } : {}), 
                    ...(sortByDesc ? { [`${sortByDesc}`]:-1 } : {})
                },
                select:filter ? filter.split('|').join(' ') : '',
                populate:{
                    path: 'owner',
                    select: 'email subscription -_id'
                }
            }
       )
    
    const {docs: contacts, totalDocs: total} = results
    return {total: total.toString(), limit, offset, contacts}
}

const getById = async (id, authId) => {
    const result = await Contact.findOne({_id:id, owner: authId}).populate({
        path:'owner',
        select: 'email subscription -_id'
    })
    return result
}

const create = async (body) => {
    console.log(body);
    const result = await Contact.create(body)
    return result
}

const update = async (id, body, authId) => {
   
    const result = await Contact.findByIdAndUpdate(
        {_id:id, owner: authId},
        {$set: body},
        {new: true}
    )
    return result
}

const remove = async (id, authId) => {

    const result = await Contact.findByIdAndDelete({_id:id, owner: authId})
    return result
}

module.exports = {
    getList,
    getById,
    remove,
    create,
    update,
}