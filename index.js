const app = require("express")();
const server = require("http").createServer(app);
const shortid = require("shortid");

const port = 4001;
const io = require("socket.io")(server);

let rooms = {};

io.on("connection", (socket) => {
    let idx;
    socket.on("createRoom", (msg) => {
        const room = {
            id: shortid.generate(),
            result: [],
            face: 6,
            nbPlayer: 0,
        };
        rooms[room.id] = room;
        socket.join(room.id);
        socket.emit("joinRoom", room.id);
    });

    socket.on("checkRoom", (msg) => {
        if (rooms[msg]) {
            socket.emit("joinRoom", msg);
        }
    });

    socket.on("enterRoom", (msg) => {
        if (rooms[msg]) {
            const { id, result, face } = rooms[msg];
            socket.join(id);
            rooms[msg].nbPlayer += 1;
            idx = rooms[msg].id;
            io.to(id).emit("changeNum", { result: result, face: face });
        } else {
            io.emit("notExist");
        }
    });

    socket.on("dice", (msg) => {
        const { id, result, face } = msg;
        rooms[id] = msg;
        socket.to(id).emit("changeNum", { result: result, face: face });
    });

    socket.on("disconnect", (msg) => {
        if (idx) {
            rooms[idx].nbPlayer -= 1;
            if (rooms[idx].nbPlayer === 0) {
                delete rooms[idx];
            }
        }
    });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
