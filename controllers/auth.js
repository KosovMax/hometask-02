const Auth = require('./../model/auth');
const jwt = require('jsonwebtoken');
const {HttpCode} = require('./../helpers/constants');
require('dotenv').config()
const SECRET_KEY = process.env.JWT_SECRET

const fs = require('fs').promises
const path = require('path')
const Jimp = require('jimp');
const createFolderIsExist = require('./../helpers/create-dir');



const register = async (req, res, next) => {

    try{
        const { email } = req.body
        const auth = await Auth.findByEmail(email)

        if(auth){

            return res.status(HttpCode.CONFLICT).json({
                status:'error',
                code: HttpCode.CONFLICT,
                data:'Conflict',
                message:'Email is already use'
              })

        }

        const newAuth = await Auth.create(req.body)

        return res.status(HttpCode.CREATED).json({
            status:'success',
            code: HttpCode.CREATED,
            data:{
                id:newAuth.id,
                email:newAuth.email,
                avatar:newAuth.avatar
            }
        })
    }catch(e){
      next(e);
    }
}

const login = async (req, res, next) => {

    try{
        const { email, password } = req.body
        const auth = await Auth.findByEmail(email)

        const isValidPassword = auth?.validPassword(password);

        if(!auth || !isValidPassword){

            return res.status(HttpCode.UNAUTHORIZED).json({
                status:'error',
                code: HttpCode.UNAUTHORIZED,
                data:'UNAUTHORIZED',
                message:'Invalid credentials'
              })

        }

        const id = auth._id;
        const payload = { id }
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2h'})

        await Auth.updateToken(id, token)

        return res.json({
            status:'success',
            code: HttpCode.CREATED,
            data:{
                token
            }
        })
    }catch(e){
      next(e);
    }
}

const logout = async (req, res, next) => {
    const id = req.auth.id
    await Auth.updateToken(id, null)
    return res.status(HttpCode.NO_CONTENT).json({})
}

const avatars = async (req, res, next) => {
    try{
        const id = req.auth.id
        const avatarUrl = await saveAvatarToStatic(req)

        await Auth.updateAvatar(id, avatarUrl)

        return res.json({
            status:'success',
            code:HttpCode.OK,
            data:{
                avatarUrl
            }
        })

    }catch(e){
        next(e)
    }
} 

const saveAvatarToStatic = async (req) => {
    const id = req.auth.id

    const AVATAR_OF_USERS = process.env.AVATAR_OF_USERS

    const pathFile = req.file.path;
    const newNameAvatar = `${Date.now()}-${req.file.originalname}`

    const img = await Jimp.read(pathFile)
    await img
    .autocrop()
    .cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER || Jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(pathFile)

    await createFolderIsExist(path.join(AVATAR_OF_USERS, id))
    await fs.rename(pathFile, path.join(AVATAR_OF_USERS, id, newNameAvatar))

    const avatarUrl = path.normalize(path.join(id, newNameAvatar))

    try{
        await fs.unlink(
            path.join(process.cwd(), AVATAR_OF_USERS, req.auth.avatar)
        )
    }catch(e){
        console.log(e.message);
    }

    return avatarUrl
}

module.exports = {
    register,
    login,
    logout,
    avatars
}