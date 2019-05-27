import express from "express";
import morgan from "morgan";
import { join } from "path";
import socketIO from "socket.io";

const PORT = 4000;
const app = express();
app.set("view engine", "pug");
app.set("views", join(__dirname, "views"));
app.use(morgan("dev"));
app.use(express.static(join(__dirname, "statics")));
app.get("/", (req, res) => res.render("home"));

const handleListening = () =>
  console.log(`✅ Server running: http://localhost:${PORT}`);

const server = app.listen(PORT, handleListening);

const io = socketIO.listen(server);

io.on("connection", (socket: any) => {
  socket.on("newMessage", ({ message }: any) => {
    const { nickname = "Anonymous" } = socket;
    socket.broadcast.emit("messageNotification", { message, nickname });
  });
  socket.on("setNickname", ({ nickname }: any) => {
    socket.nickname = nickname;
  });
});
