import authServices from '../services/auth.js'

const authControllers = {
    register: async (req, res) => {
        const { email, password, firstName, lastName } = req.body
        const userData = { email, password, firstName, lastName }
        const user = await authServices.register(userData)
        res.json(user)
    },

    login: async (req, res) => {
        const { email, password } = req.body
        const userData = { email, password }
        const user = await authServices.login(userData)
        const { refreshToken, ...userInfo } = user
        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 8 * 60 * 60 * 1000,
        }).json(userInfo)
    },

    refreshToken: async (req, res) => {
        const { refresh_token } = req.cookies
        const user = await authServices.refreshToken(refresh_token)
        res.json(user)
    },
}

export default authControllers
