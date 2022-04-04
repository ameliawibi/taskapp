import express from 'express';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import taskRouter from './routes/task';
import authRouter from './routes/userAuth';
import { router } from './routes/index';
import {getHashedCookie} from "./utility/hash";

const app = express();

// Set the view engine to ejs
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(fileUpload());
// serve static files
app.use(express.static('uploads'));
app.use(express.static('public'));

const salt = process.env.SECRET_KEY;
app.use((request, response, next) => {
  // set the default value
  request.isUserLoggedIn = false;

  // check to see if the cookies you need exists
  if (request.cookies.loggedInHash && request.cookies.userID) {
    // get the hased value that should be inside the cookie
    const hash = getHashedCookie(request.cookies.userID, salt);

    // test the value of the cookie
    if (request.cookies.loggedInHash === hash) {
      request.isUserLoggedIn = true;
    }
  }
  next();
});

app.use('/', router);
app.use('/auth', authRouter);
app.use('/task', taskRouter);

app.listen(3004);
