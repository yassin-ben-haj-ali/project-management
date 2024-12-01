import express from "express";
import authControllers from "../controllers/auth.js";
import catchMiddleware from "../middlewares/api.js"

const authRouter = express.Router();

authRouter.post("/register",catchMiddleware(authControllers.register));
authRouter.post("/login", catchMiddleware(authControllers.login));


export default authRouter;