// @ts-ignore
const socket = io("/");

// @ts-ignore
function sendMessage(message) {
  socket.emit("newMessage", { message });
  console.log(`You : ${message}`);
}

// @ts-ignore
function setNickname(nickname) {
  socket.emit("setNickname", { nickname });
}

// @ts-ignore
function handleMessageNotification(data) {
  const { message, nickname } = data;
  console.log(`${nickname}: ${message}`);
}

socket.on("messageNotification", handleMessageNotification);
