// @ts-ignore
var socket = io("/");
// @ts-ignore
function sendMessage(message) {
    socket.emit("newMessage", { message: message });
    console.log("You : " + message);
}
// @ts-ignore
function setNickname(nickname) {
    socket.emit("setNickname", { nickname: nickname });
}
// @ts-ignore
function handleMessageNotification(data) {
    var message = data.message, nickname = data.nickname;
    console.log(nickname + ": " + message);
}
socket.on("messageNotification", handleMessageNotification);
