import MessageService from '../service/MessageService';
const messageService = new MessageService();

export default function init(io) {
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
}