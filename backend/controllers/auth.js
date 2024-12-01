import authServices from "../services/auth.js"



const authControllers = {

    register: async (req, res) => {
        const { email, password, firstName, lastName } = req.body;
        const userData = { email, password, firstName, lastName }
        const user = await authServices.register(userData);
        res.json(user);
    },

    login: async (req, res) => {
        const { email, password } = req.body;
        const userData = { email, password }
        const user = await authServices.login(userData);
        res.json(user);
    }
}

export default authControllers;