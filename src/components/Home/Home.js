import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Dialog, DialogTitle, DialogContent } from "@material-ui/core";

const io = require("socket.io-client");
const socket = io("http://localhost:4001");
function App() {
    let history = useHistory();
    const createNewRoom = () => {
        socket.emit("createRoom", {});
    };

    useEffect(() => {
        socket.on("newRoom", (msg) => {
            history.push("/roll#" + msg);
        });
        return () => socket.disconnect();
    }, [history]);
    return (
        <React.Fragment>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <button style={{ margin: 10 }} onClick={createNewRoom}>
                    Create
                </button>

                <button style={{ margin: 10 }}>Join</button>
            </div>
        </React.Fragment>
    );
}
export default App;
