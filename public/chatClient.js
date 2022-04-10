function chatApp() {
  const socket = io();
  // client-side
  const messages = document.getElementById('messages');
  console.log(messages);
  const form = document.getElementById('form');
  const input = document.getElementById('input');

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
      //socket.emit("chatMessage", [message, username, currentRoom]);
      // to do: https://www.w3schools.com/js/js_cookies.asp
      socket.emit('chat message', input.value);
      input.value = '';
    }
  });

  socket.on('chat message', function(msg) {
    console.log("this happens");
    const chatMessageWrapper = document.createElement('div');
    const chatMessageDiv = document.createElement('div');
    const chatMessageText = document.createElement('span');
    const chatMessageSender = document.createElement('img');
    chatMessageWrapper.className = "flex items-end justify-end";
    chatMessageDiv.className = "flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end";
    chatMessageText.className = "px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white";
    chatMessageSender.className = "w-6 h-6 rounded-full order-2";
    //newMessage.innerHTML = `${data[1]} : ${data[0]}`;
    chatMessageSender.src = "user1.jpeg";
    chatMessageText.textContent = msg;

    chatMessageDiv.appendChild(chatMessageText);
    chatMessageWrapper.appendChild(chatMessageDiv);
    chatMessageWrapper.appendChild(chatMessageSender);
    messages.appendChild(chatMessageWrapper);
  });

  socket.on("connect", () => {
    console.log("test connection");
  });
}