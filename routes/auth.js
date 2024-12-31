import express from 'express'
import authControllers from '../controllers/auth.js'
import catchMiddleware from '../middlewares/api.js'
import validate from '../middlewares/validate.js'

const authRouter = express.Router()

authRouter.post(
    '/register',
    validate('register'),
    catchMiddleware(authControllers.register)
)
authRouter.post('/login', catchMiddleware(authControllers.login))
authRouter.get('/refresh', catchMiddleware(authControllers.refreshToken))

export default authRouter
