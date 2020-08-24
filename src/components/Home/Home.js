import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import Dialog from "../Dialog";
import { Button } from "@blueprintjs/core";

const io = require("socket.io-client");
const socket = io("http://localhost:4001");
function App() {
    const [isOpen, setOpen] = useState(false);
    const [openId, setId] = useState("");

    let history = useHistory();
    const createNewRoom = () => {
        socket.emit("createRoom", {});
    };

    useEffect(() => {
        socket.on("joinRoom", (msg) => {
            history.push("/roll#" + msg);
        });
        return () => socket.disconnect();
    }, [history]);

    const closeDialog = () => {
        setOpen(false);
    };

    const checkRoom = (idRoom) => {
        console.log(idRoom);
        socket.emit("checkRoom", idRoom);
    };

    return (
        <React.Fragment>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <button style={{ margin: 10, width: 60 }} onClick={createNewRoom}>
                    Create
                </button>
                <button style={{ margin: 10, width: 60 }} onClick={() => setOpen(!isOpen)}>
                    Join
                </button>
                {isOpen && (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            border: "solid",
                            borderWidth: 1,
                            padding: 10,
                            background: "#EFEFEF",
                        }}
                    >
                        <input
                            type="text"
                            value={openId}
                            style={{ width: 100, marginRight: 10 }}
                            placeholder="room number"
                            autoFocus={true}
                            onChange={(e) => setId(e.target.value)}
                        ></input>
                        <button
                            onClick={() => {
                                setOpen(false);
                                checkRoom(openId);
                            }}
                        >
                            ok
                        </button>
                    </div>
                )}
                {/*                 <Dialog isOpen={isOpen} closeDialog={closeDialog} joinRoom={checkRoom} />{" "} */}
            </div>
        </React.Fragment>
    );
}
export default App;
