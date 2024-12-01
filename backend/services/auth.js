import bcrypt from "bcryptjs"
import User from "../models/User.js";
import  generateToken  from "../utils/generateToken.js";
import { AlreadyExistError, BadRequestError } from "../utils/appErrors.js";


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

        const token = generateToken({ email: user.email, firstName: user.firstName, lastName: user.lastName });
        return {
            ...user._doc,
            password: "",
            token
        }

    }


}

export default authServices;