import authServices from "../services/auth.js"



const authControllers = {

    register: async (req,res) => {
        const { email, password, firstName, lastName } = req.body;
        const userData = { email, password, firstName, lastName }
        try {
            const user = await authServices.register(userData);
            res.json(user);
        } catch (error) {
            throw new Error(error);
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;
        const userData = { email, password }
        try {
            const user = await authServices.login(userData);
            res.json(user);
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default authControllers;