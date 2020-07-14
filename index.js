const app = require("express")();
const server = require("http").createServer(app);

const port = 4001;
const io = require("socket.io")(server);

let actualDice = { result: [], face: 6 };
io.on("connection", (socket) => {
    socket.emit("changeNum", actualDice);
    socket.on("dice", (msg) => {
        socket.broadcast.emit("changeNum", msg);
        actualDice = msg;
    });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
