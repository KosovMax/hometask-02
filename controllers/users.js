
const Auth = require('./../model/auth');
const {HttpCode} = require('./../helpers/constants');


const current = async (req, res, next) => {

    try{

        const id = req.auth.id
        const auth = await Auth.findById(id)

        console.log(auth);

        if(!auth){

            return res.status(HttpCode.UNAUTHORIZED).json({
                status:'error',
                code: HttpCode.UNAUTHORIZED,
                data:'UNAUTHORIZED',
                message:'Invalid credentials'
              })

    
        }

        const { email, subscription } = auth

        return res.json({
            status:'success',
            code: HttpCode.OK,
            data:{
                email, 
                subscription
            }
        })
    }catch(e){
      next(e);
    }
}

module.exports = {
    current
}

