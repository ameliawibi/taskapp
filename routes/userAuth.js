import express from 'express';
import methodOverride from 'method-override';
import {
  getSignup, postSignup, getLogin, postLogin, getLogout,
} from '../controllers/userAuth';
import {
  loginValidator,signUpValidator
} from "../utility/validator";

const authRouter = express.Router();
// Configure Express to parse request body data into request.body
authRouter.use(express.urlencoded({ extended: false }));
// Override POST requests with query param ?_method=PUT/DELETE to be PUT/DELETE requests
authRouter.use(methodOverride('_method'));

authRouter.get('/signup', getSignup);

authRouter.post('/signup', signUpValidator, postSignup);

authRouter.get('/login', getLogin);

authRouter.post('/login',loginValidator, postLogin);

authRouter.get('/logout', getLogout);

export default authRouter;
