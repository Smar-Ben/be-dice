const app = require("express")();
const server = require("http").createServer(app);
const shortid = require("shortid");

const port = 4001;
const io = require("socket.io")(server);

let rooms = {};

io.on("connection", (socket) => {
    let idx;
    let pseudo = "";
    socket.on("createRoom", (msg) => {
        const room = {
            id: shortid.generate(),
            result: [],
            face: 6,
            nbPlayer: 0,
            player: [],
        };
        rooms[room.id] = room;
        socket.join(room.id);
        socket.emit("joinRoom", room.id);
    });

    socket.on("checkRoom", (msg) => {
        if (rooms[msg]) {
            socket.emit("joinRoom", msg);
        } else {
            socket.emit("errorFound", msg);
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

    socket.on("addPlayer", (msg) => {
        const { id, newPseudo } = msg;
        console.log(rooms[id]);
        if (rooms[id].player.indexOf(newPseudo) === -1) {
            rooms[id].player.push(newPseudo);
            pseudo = newPseudo;
            socket.emit("launchGame", { status: "good", list: rooms[id].player });
            socket.to(id).emit("launchGame", { status: "good", list: rooms[id].player });
        } else {
            socket.emit("launchGame", { status: "error" });
        }
    });

    socket.on("dice", (msg) => {
        const { id, result, face } = msg;
        rooms[id] = msg;
        socket.to(id).emit("changeNum", { result: result, face: face, pseudo: pseudo });
    });

    socket.on("disconnect", (msg) => {
        if (idx) {
            rooms[idx].nbPlayer -= 1;
            if (pseudo !== "") {
                const playerTab = rooms[idx].player;
                playerTab.splice(playerTab.indexOf(pseudo), 1);
                socket.to(idx).emit("updatePlayer", { list: rooms[idx].player });
            }
            if (rooms[idx].nbPlayer === 0) {
                delete rooms[idx];
            }
        }
    });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
