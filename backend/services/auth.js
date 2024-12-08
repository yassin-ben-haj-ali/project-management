import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import { AlreadyExistError, AuthorizationError, BadRequestError, NotFoundError } from "../utils/appErrors.js";


const authServices = {

    register: async (userData) => {
        const { email, password } = userData;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new AlreadyExistError("email is already taken")
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const newUser = new User({
            ...userData,
            password: hashedPassword
        });

        await newUser.save();

        return { ...newUser._doc, password: "" };
    },

    login: async (userData) => {

        const { email, password } = userData;

        const user = await User.findOne({ email });

        const isPasswordCorrect = await bcrypt.compare(password, user.password ?? "");

        if (!user || !isPasswordCorrect) {
            throw new BadRequestError("Invalid email or Password")
        }

        const accessToken = generateToken({ email: user.email, firstName: user.firstName, lastName: user.lastName }, 'access');
        const refreshToken = generateToken({ id: user._id }, 'refresh')
        return {
            ...user._doc,
            password: "",
            accessToken,
            refreshToken
        }

    },

    refreshToken: async (token) => {
        if (!token) {
            throw new AuthorizationError();
        }
        const isValidToken = jwt.verify(token, process.env.SECRET_REFRESH_TOKEN);

        if (!isValidToken) {
            throw new AuthorizationError()
        }

        const user = await User.findById(isValidToken.id).select("-password");

        if (!user) {
            throw new NotFoundError('user not found')
        }

        return {token:generateToken({ email: user.email, firstName: user.firstName, lastName: user.lastName })};
    }


}

export default authServices;