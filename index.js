const app = require("express")();
const server = require("http").createServer(app);

const port = 4001;
const io = require("socket.io")(server);

let rooms = {};
let i = 0;
io.on("connection", (socket) => {
    /* 
    socket.emit("changeNum", actualDice);
    
    socket.on("createRoom", (msg) => {
        console.log("New room created " + msg);
        const num = Math.floor(Math.random() * 10);
        socket.emit("newRoom", num);
    });
    socket.on("disconnect", () => {
        console.log("user disconnected");
    }); */

    socket.on("createRoom", (msg) => {
        const room = {
            id: i.toString(),
            result: [],
            face: 6,
        };
        rooms[room.id] = room;
        console.log(isNaN(room.id));
        socket.join(room.id);
        socket.emit("newRoom", i);
        i++;
    });

    socket.on("enterRoom", (msg) => {
        const { id, result, face } = rooms[msg];
        socket.join(id);
        io.to(id).emit("changeNum", { result: result, face: face });
    });

    socket.on("dice", (msg) => {
        const { id, result, face } = msg;
        rooms[id] = msg;
        socket.to(id).emit("changeNum", { result: result, face: face });
    });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
