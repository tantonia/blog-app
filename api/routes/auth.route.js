import { signin, signout, signup, checkRoute } from "../controllers/auth.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import express from 'express';

const authRouter = express.Router();
authRouter.post('/signup', signup);
authRouter.post('/signin', signin);
authRouter.get('/signout', signout);
authRouter.get('/check', verifyToken, checkRoute);

export default authRouter;