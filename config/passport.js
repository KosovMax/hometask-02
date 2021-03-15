const passport = require('passport');
const {Strategy, ExtractJwt} = require('passport-jwt')
require('dotenv').config()
const SECRET_KEY = process.env.JWT_SECRET

const Auth = require('./../model/auth')


var params = {
    secretOrKey: SECRET_KEY,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}



passport.use(
    new Strategy(params, async (payload, done) => {
        try{
            const auth = await Auth.findById(payload.id)
            if(!auth){
                return done(new Error('Auth not found'))
            }

            if(!auth.token){
                return done(null, false);
            }

            return done(null, auth);
        }catch(e){
            done(e)
        }
    })
);