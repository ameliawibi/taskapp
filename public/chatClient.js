function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function chatApp() {
  const socket = io();
  // client-side
  const messages = document.getElementById('messages');
  const form = document.getElementById('form');
  const input = document.getElementById('input');
    
  socket.emit("subscribe");
  //to do: display chat history
  socket.once('joinRoom', function (chatHistory) {
    console.log('joinRoom happened');
    chatHistory.forEach((data) => {
    const senderID = Number(getCookie("userID"));
    const chatMessageWrapper = document.createElement('div');
    const chatMessageDiv = document.createElement('div');
    const chatMessageText = document.createElement('span');
    const chatMessageSender = document.createElement('img');
    if (senderID == data.id) {
    chatMessageWrapper.className = "flex items-end justify-end";
    chatMessageDiv.className = "flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end";
    chatMessageText.className = "px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white";
    chatMessageSender.className = "w-6 h-6 rounded-full order-2";
    }
    if (senderID !== data.id) {
    chatMessageWrapper.className = "flex items-end";
    chatMessageDiv.className = "flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start";
    chatMessageText.className = "px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600";
    chatMessageSender.className = "w-6 h-6 rounded-full order-1";
    }
    chatMessageSender.src = data.avatar;
    chatMessageText.textContent = data.message;

    chatMessageDiv.appendChild(chatMessageText);
    chatMessageWrapper.appendChild(chatMessageDiv);
    chatMessageWrapper.appendChild(chatMessageSender);
    messages.appendChild(chatMessageWrapper);
    });
  });

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
      socket.emit('chat message', [input.value,getCookie("avatar"),getCookie("userID")]);
      input.value = '';
    }
  });


  //to do: different style isMessageFromUser
  socket.on('chat message', function(data) {
    const senderID = getCookie("userID");
    const chatMessageWrapper = document.createElement('div');
    const chatMessageDiv = document.createElement('div');
    const chatMessageText = document.createElement('span');
    const chatMessageSender = document.createElement('img');
    if (senderID == data[2]) {
    chatMessageWrapper.className = "flex items-end justify-end";
    chatMessageDiv.className = "flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end";
    chatMessageText.className = "px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white";
    chatMessageSender.className = "w-6 h-6 rounded-full order-2";
    }
    if (senderID !== data[2]) {
    chatMessageWrapper.className = "flex items-end";
    chatMessageDiv.className = "flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start";
    chatMessageText.className = "px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600";
    chatMessageSender.className = "w-6 h-6 rounded-full order-1";
    }
    chatMessageSender.src = data[1];
    chatMessageText.textContent = data[0];

    chatMessageDiv.appendChild(chatMessageText);
    chatMessageWrapper.appendChild(chatMessageDiv);
    chatMessageWrapper.appendChild(chatMessageSender);
    messages.appendChild(chatMessageWrapper);
  });

  socket.on("connect", () => {
    console.log("socket connected");
  });
}