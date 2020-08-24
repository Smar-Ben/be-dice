import React, { useEffect, useState, useRef } from "react";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

function DialogBox(props) {
    const [text, setText] = useState("");
    const refButton = useRef(null);
    const refDialog = useRef(null);

    /* const handleEnter = (e) => {
        if (e.keyCode === 13) {
            refButton.current.focus();
        }
    }; */

    const handleClose = () => {
        props.closeDialog();
        setText("");
    };

    const changeRoom = () => {
        props.joinRoom(text);
        props.closeDialog();
    };

    return (
        <Dialog open={props.isOpen} onClose={handleClose} ref={refDialog}>
            <DialogContent style={{ textAlign: "center" }}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-around",
                    }}
                >
                    <IconButton
                        onClick={handleClose}
                        style={{ position: "absolute", top: 0, right: 0 }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <h4 style={{ marginTop: 0 }}>Choisir une partie</h4>
                    <input
                        type="text"
                        placeholder="Numéro de la partie"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <div
                        style={{
                            paddingTop: 20,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-around",
                        }}
                    >
                        <Button onClick={handleClose}>Annuler</Button>
                        <Button color="primary" onClick={changeRoom} ref={refButton}>
                            Rejoindre
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
export default DialogBox;
