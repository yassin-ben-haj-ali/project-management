import express from "express";
import authControllers from "../controllers/auth.js";

const authRouter = express.Router();

authRouter.post("/register", authControllers.register);
authRouter.post("/login", authControllers.login);


export default authRouter;