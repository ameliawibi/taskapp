import express from 'express';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import taskRouter from './routes/task';
import authRouter from './routes/userAuth';
import quillRouter from './routes/quillTest';
import { router } from './routes/index';
import {getHashedCookie} from "./utility/hash";
import chatRouter from './routes/chatRouter';
import { createServer } from "http";
import { Server } from "socket.io";
import MessageService from './service/MessageService';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(cookieParser());
app.use(fileUpload());
// serve static files
app.use(express.static('uploads'));
app.use(express.static('public'));

const salt = process.env.SECRET_KEY;
app.use((request, _response, next) => {
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
app.use('/quill', quillRouter);
app.use('/chat',chatRouter);



const messageService = new MessageService();
// server-side
io.on('connection', (socket) => {
  console.log('a user is connected');
  console.log("socket id: ", socket.id);

  // joining chatrooms
  let chatroom = "default";

  socket.on("subscribe", async () => {

    let chatHistory = await messageService.getMessage();
    //console.log(chatHistory);
    socket.join(chatroom);
    console.log("a user has joined our room: " + chatroom);

    io.to(chatroom).emit("joinRoom", chatHistory);
  });


  socket.on('chat message', async (data) => {
    const message = data[0];
    const sender_id = data[2];
    await messageService.createMessage(sender_id,message);
    io.to(chatroom).emit('chat message', data);
  });

  socket.on('disconnect', () => {
    socket.leave(chatroom);
    socket.disconnect();
    console.log(`user ${socket.id} has left room ${chatroom}`);
    io.to(chatroom).emit("leaveRoom", chatroom);
  });
});

httpServer.listen(3004,() => {
  console.log('listening on *:3004');
});