const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const {HttpCode} = require('./helpers/constants');
require('dotenv').config()
const path = require('path');

const contactsRouter = require('./routes/api/contacts')
const authRouter = require('./routes/auth')
const usersRouter = require('./routes/users')

const AVATAR_OF_USERS = process.env.AVATAR_OF_USERS

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json({ limit: 10000}))
app.use(helmet());
app.use(express.static(path.join(__dirname, AVATAR_OF_USERS)))

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  handler: (req, res, next)=>{
    return res.status(HttpCode.BAD_REQUEST).json({
        status:'error',
        code: HttpCode.BAD_REQUEST,
        data:'Bad request',
        message:'Too many requests, please try again later.'
    })
}
});

// app.use("/api/", apiLimiter);

app.use('/api/contacts', contactsRouter)
app.use('/auth/', authRouter)
app.use('/users/', usersRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message })
})

module.exports = app
