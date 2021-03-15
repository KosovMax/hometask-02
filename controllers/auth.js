const Auth = require('./../model/auth');
const jwt = require('jsonwebtoken');
const {HttpCode} = require('./../helpers/constants');
require('dotenv').config()
const SECRET_KEY = process.env.JWT_SECRET


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

        return res.json({
            status:'success',
            code: HttpCode.CREATED,
            data:{
                id:newAuth.id,
                email:newAuth.email
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

        const isValidPassword = auth.validPassword(password);

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


module.exports = {
    register,
    login,
    logout,
}