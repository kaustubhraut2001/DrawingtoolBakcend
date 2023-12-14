const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });
app.use(cors({
    origin: '*',
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