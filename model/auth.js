const Auth = require('./schemas/auth')

const findByEmail = async (email) =>{
    return await Auth.findOne({ email })
}

const findById = async ( id ) =>{
    return await Auth.findOne({ _id: id }) 
}

const findByVerifyToken = async ( verifyToken ) =>{
    return await Auth.findOne({ verifyToken }) 
}

const create = async ({email, password, subscription, verify, verifyToken}) => {
    const auth = new Auth({email, password, subscription, verify, verifyToken})
    return await auth.save()
}

const updateToken = async (id, token) => {
    return await Auth.updateOne({ _id: id}, { token })
}

const updateAvatar = async (id, avatar) => {
    return await Auth.updateOne({ _id: id}, { avatar })
}

const updateVerifyToken = async (id, verify, verifyToken) => {
    return await Auth.updateOne({ _id: id}, { verify, verifyToken })
}

module.exports = {
    findByEmail,
    findById,
    create,
    updateToken,
    updateAvatar,
    findByVerifyToken,
    updateVerifyToken
}