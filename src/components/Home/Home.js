import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Dialog, DialogTitle, DialogContent } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

const io = require("socket.io-client");
const socket = io("http://localhost:4001");
function App() {
    const [isOpen, setOpen] = useState(false);
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
                <button style={{ margin: 10 }} onClick={() => setOpen(true)}>
                    Join
                </button>
                <Dialog open={isOpen} onClose={() => setOpen(false)}>
                    <DialogTitle
                        style={{ display: "flex", flexDirection: "row", paddingBottom: 0 }}
                    >
                        Création d'une nouvelle partie
                        <IconButton onClick={() => setOpen(false)}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent style={{ textAlign: "center" }}>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-around",
                            }}
                        >
                            <h4 style={{ marginTop: 0 }}>Choisir une partie</h4>
                            <input
                                type="text"
                                /* value={this.state.textRoom}
                                placeholder="Numéro de la partie"
                                onChange={(e) => {
                                    this.handleChange(e);
                                }} */
                            />
                            <div
                                style={{
                                    paddingTop: 20,
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-around",
                                }}
                            >
                                <Button variant="contained" onClick={() => setOpen(false)}>
                                    Annuler
                                </Button>
                                <Button variant="contained" color="primary">
                                    Rejoindre
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </React.Fragment>
    );
}
export default App;
