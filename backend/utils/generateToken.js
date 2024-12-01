import jwt from "jsonwebtoken";

const generateToken = (payload) => {

    const { SECRET_TOKEN } = process.env;

    const token = jwt.sign(payload, SECRET_TOKEN, { expiresIn: "8h" });

    return token;

}

export default generateToken;