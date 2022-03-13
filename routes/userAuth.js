import express from 'express';
import {getSignup,postSignup,getLogin,postLogin,getLogout} from "../controllers/userAuth.js";
import methodOverride from "method-override";

export const authRouter = express.Router();
// Configure Express to parse request body data into request.body
authRouter.use(express.urlencoded({ extended: false }));
// Override POST requests with query param ?_method=PUT/DELETE to be PUT/DELETE requests
authRouter.use(methodOverride("_method"));

authRouter.get('/signup',getSignup);

authRouter.post('/signup',postSignup);

authRouter.get('/login',getLogin);

authRouter.post('/login',postLogin);

authRouter.get('/logout',getLogout);

