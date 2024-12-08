import jwt from "jsonwebtoken";

const generateToken = (payload, type='access') => {

    const { SECRET_ACESS_TOKEN, SECRET_REFRESH_TOKEN, ACCESS_TOKEN_EXPIRATION, REFRESH_TOKEN_EXPIRATION } = process.env;

    return jwt.sign(payload, type == 'access' ? SECRET_ACESS_TOKEN : SECRET_REFRESH_TOKEN, { expiresIn: type == 'access' ? ACCESS_TOKEN_EXPIRATION : REFRESH_TOKEN_EXPIRATION });
}

export default generateToken;