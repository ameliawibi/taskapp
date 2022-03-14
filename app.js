import express from 'express';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import taskRouter from './routes/task';
import authRouter from './routes/userAuth';
import { router } from './routes/index';

const app = express();

// Set the view engine to ejs
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(fileUpload());
// serve static files
app.use(express.static('uploads'));
app.use(express.static('public'));

app.use('/', router);
app.use('/auth', authRouter);
app.use('/task', taskRouter);

app.listen(3004);
