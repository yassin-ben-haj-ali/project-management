import jwt from 'jsonwebtoken'

const generateToken = (payload, type = 'access') => {
    const {
        SECRET_ACCESS_TOKEN,
        SECRET_REFRESH_TOKEN,
        ACCESS_TOKEN_EXPIRATION,
        REFRESH_TOKEN_EXPIRATION,
    } = process.env

    const secret =
        type === 'access' ? SECRET_ACCESS_TOKEN : SECRET_REFRESH_TOKEN
    const expiresIn =
        type === 'access' ? ACCESS_TOKEN_EXPIRATION : REFRESH_TOKEN_EXPIRATION

    return jwt.sign(payload, secret, { expiresIn })
}

export default generateToken
