import bcrypt from "bcryptjs"
import User from "../models/User.js";


const authServices = {

    register: async (userData) => {
        const { email, password } = userData;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error("email is already taken")
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
            throw new Error("Invalid email or Password")
        }

        return {
            ...user._doc,
            password: "",
        }

    }


}

export default authServices;