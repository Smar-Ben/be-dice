import React, { useState, useEffect, Fragment } from "react";
import "./Roll.css";
import Result from "../Result/Result";
import { Snackbar, IconButton, CircularProgress } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import useEvent from "../../hook/useEvent";
const io = require("socket.io-client");
const socket = io("http://localhost:4001");

function App() {
    const [numDice, setDice] = useState(1);
    const [numFace, setFace] = useState(6);
    const [num, setNum] = useState({ result: [], face: 6, pseudo: "" });
    const [isPlaying, setPlaying] = useState(false);
    const [pseudo, setPseudo] = useState("");
    const [isReady, setReady] = useState(false);
    const [warning, setWarning] = useState(false);
    const [loading, setLoading] = useState(true);
    const [listPlayer, setListPlayer] = useState([]);

    const getRoomNb = () => {
        return window.location.href.split("#")[1];
    };

    const pressHandle = (event) => {
        if (event.keyCode === 13) {
            handleSubmit();
        }
    };

    const handleSubmit = () => {
        if (pseudo.length >= 2) {
            socket.emit("addPlayer", { id: getRoomNb(), newPseudo: pseudo });
        } else {
            setWarning(true);
        }
    };

    useEvent("keydown", pressHandle);

    useEffect(() => {
        socket.emit("enterRoom", getRoomNb());
        socket.on("notExist", (msg) => {
            setLoading(false);
            setPlaying(false);
        });
        socket.on("changeNum", (msg) => {
            setNum(msg);
            setPlaying(true);
            setLoading(false);
        });
        socket.on("updatePlayer", (msg) => {
            console.log(msg);
            setListPlayer(msg.list);
        });
        socket.on("launchGame", (msg) => {
            if (msg.status === "error") {
                setWarning(true);
            } else if (msg.status === "good") {
                setReady(true);
                setListPlayer(msg.list);
            }
        });
        return () => socket.disconnect();
    }, []);

    const changeNumber = () => {
        const newNum = new Array(numDice);
        for (let i = 0; i < numDice; i++) {
            newNum[i] = Math.floor(Math.random() * numFace) + 1;
        }
        setNum({ result: newNum, face: numFace, pseudo: pseudo });
        socket.emit("dice", { id: getRoomNb(), result: newNum, face: numFace });
    };

    const changeNumberDice = (e) => {
        setDice(e.target.value);
    };

    const changeFaceNum = (e) => {
        setFace(parseInt(e.target.value));
    };

    if (loading) {
        return (
            <Fragment>
                <CircularProgress></CircularProgress>
            </Fragment>
        );
    } else if (!isPlaying) {
        return (
            <Fragment>
                <div className="selector">
                    <h3>Erreur de page</h3>
                </div>
            </Fragment>
        );
    } else if (!isReady) {
        return (
            <Fragment>
                <input
                    type="text"
                    value={pseudo}
                    onChange={(e) => setPseudo(e.target.value)}
                    placeholder="Pseudo"
                    style={{ marginLeft: 30, marginRight: 30 }}
                ></input>
                <button onClick={handleSubmit}>Submit</button>
                <Snackbar
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    open={warning}
                    autoHideDuration={4000}
                    onClose={() => {
                        setWarning(false);
                    }}
                    severity="success"
                    message={
                        pseudo.length < 2 ? "Le pseudo est trop court" : "Ce pseudo existe déjà"
                    }
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
            </Fragment>
        );
    } else {
        return (
            <Fragment>
                <div className="selector">
                    <h3>
                        Room number {getRoomNb()}
                        {/* <br /> Pseudo: {pseudo} */}
                    </h3>
                    <p>
                        Roll{" "}
                        <input
                            type="number"
                            id="dices"
                            name="dices"
                            min="1"
                            max="200"
                            value={numDice}
                            onChange={changeNumberDice}
                        ></input>{" "}
                        dices with{" "}
                        <select name="faces" id="faces" value={numFace} onChange={changeFaceNum}>
                            <option value={4}>4</option>
                            <option value={6}>6</option>
                            <option value={8}>8</option>
                            <option value={10}>10</option>
                            <option value={12}>12</option>
                            <option value={20}>20</option>
                        </select>{" "}
                        faces
                    </p>
                </div>
                <button onClick={changeNumber}>Roll a dice</button>
                <Result
                    dices={num.result.length}
                    faces={num.face}
                    num={num.result}
                    pseudo={num.pseudo}
                ></Result>
                <div>
                    <h3>Liste des joueurs</h3>
                    {listPlayer.map((el, index) => {
                        return <p key={index}>{el === pseudo ? el + " (vous)" : el}</p>;
                    })}
                </div>
            </Fragment>
        );
    }
}

export default App;
