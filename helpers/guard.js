const passport = require('passport');
require('../config/passport');

const {HttpCode} = require('./constants')

const guard = (req, res, next) => {
    passport.authenticate('jwt', {session: false}, (err, auth)=>{
        // console.log(req.get('Authorization'));
  
        const token =  req.get('Authorization')?.split(' ')[1]
        
        if(!auth || err || token !== auth.token){
            return res.status(HttpCode.FORBIDDEN).json({
                status:'error',
                code: HttpCode.FORBIDDEN,
                data:'Forbidden',
                message:'Access is denied'
              })
        }

        req.auth = auth
        return next()
    })(req, res, next)
}

module.exports = guard;