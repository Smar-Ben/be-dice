import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import useEvent from "../../hook/useEvent";
import { CircularProgress } from "@material-ui/core";
import { Snackbar, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const io = require("socket.io-client");
const socket = io("http://localhost:4001");
function App() {
    const [isOpen, setOpen] = useState(false);
    const [openId, setId] = useState("");
    const [loading, setLoading] = useState(false);
    const [warning, setWarning] = useState(false);
    const buttonRef = useRef();
    let history = useHistory();

    const handler = (event) => {
        if (event.keyCode === 13 && isOpen) {
            buttonRef.current.click();
        }
    };

    useEvent("keydown", handler);
    const createNewRoom = () => {
        socket.emit("createRoom", {});
    };

    useEffect(() => {
        socket.on("joinRoom", (msg) => {
            setLoading(false);
            setId("");
            setOpen(false);
            history.push("/roll#" + msg);
        });
        socket.on("errorFound", (msg) => {
            setId("");
            setLoading(false);
            setWarning(true);
        });
        return () => socket.disconnect();
    }, [history]);

    const checkRoom = (idRoom) => {
        setLoading(false);
        socket.emit("checkRoom", idRoom);
        setId("");
    };

    return (
        <React.Fragment>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <button style={{ margin: 10, width: 60 }} onClick={createNewRoom}>
                    Create
                </button>
                <button
                    style={{ margin: 10, width: 60 }}
                    onClick={() => {
                        setOpen(!isOpen);
                        setId("");
                    }}
                >
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
                            style={{ marginRight: "10px" }}
                            onClick={() => {
                                checkRoom(openId);
                            }}
                            ref={buttonRef}
                        >
                            {!loading ? "Go" : <CircularProgress size={10}></CircularProgress>}
                        </button>
                        <button
                            onClick={() => {
                                setOpen(false);
                                setId("");
                            }}
                        >
                            Annuler
                        </button>
                        <Snackbar
                            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                            open={warning}
                            autoHideDuration={2000}
                            onClose={() => {
                                setWarning(false);
                            }}
                            severity="warning"
                            message="Votre ID n'est pas valide"
                            action={
                                <React.Fragment>
                                    <IconButton
                                        size="small"
                                        aria-label="close"
                                        color="inherit"
                                        onClick={() => {
                                            setWarning(false);
                                        }}
                                    >
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                </React.Fragment>
                            }
                        />
                    </div>
                )}
            </div>
        </React.Fragment>
    );
}
export default App;
