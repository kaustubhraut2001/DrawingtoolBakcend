const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const httpServer = createServer(app);
const envirnmentt = process.env.envirnment;
const url = envirnmentt === "production" ? "https://paint-app-ruddy.vercel.app/" : "http://localhost:3000";
const io = new Server(httpServer, { cors: { origin: url } });
app.use(cors({
    origin: url,
}));

io.on("connection", (socket) => {
    // ...
    console.log("a user connected");
    socket.on('beginpath', (arg) => {
        socket.broadcast.emit('beginpath', arg);

    });
    socket.on('drawpath', (arg) => {
        socket.broadcast.emit('drawpath', arg);

    });

    socket.on('changeconfig', (arg) => {
        socket.broadcast.emit('changeconfig', arg);

    });
});

httpServer.listen(5000);