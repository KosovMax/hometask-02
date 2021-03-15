const Auth = require('./schemas/auth')

const findByEmail = async (email) =>{
    return await Auth.findOne({ email })
}

const findById = async ( id ) =>{
    return await Auth.findOne({ _id: id }) 
}

const create = async ({email, password, subscription}) => {
    const auth = new Auth({email, password, subscription})
    return await auth.save()
}

const updateToken = async (id, token) => {
    return await Auth.updateOne({ _id: id}, { token })
}

const updateAvatar = async (id, avatar) => {
    return await Auth.updateOne({ _id: id}, { avatar })
}

module.exports = {
    findByEmail,
    findById,
    create,
    updateToken,
    updateAvatar
}