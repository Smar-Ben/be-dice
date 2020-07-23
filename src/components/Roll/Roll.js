import React, { useState, useEffect, Fragment } from "react";
import "./Roll.css";
import Result from "../Result/Result";
const io = require("socket.io-client");
const socket = io("http://localhost:4001");

function App() {
    const [numDice, setDice] = useState(1);
    const [numFace, setFace] = useState(6);
    const [num, setNum] = useState({ result: [], face: 6 });

    const getRoomNb = () => {
        return window.location.href.split("#")[1];
    };

    useEffect(() => {
        socket.emit("enterRoom", getRoomNb());
        socket.on("changeNum", (msg) => {
            console.log(msg);
            setNum(msg);
        });
        return () => socket.disconnect();
    }, []);

    const changeNumber = () => {
        const newNum = new Array(numDice);
        for (let i = 0; i < numDice; i++) {
            newNum[i] = Math.floor(Math.random() * numFace) + 1;
        }
        setNum({ result: newNum, face: numFace });
        socket.emit("dice", { id: getRoomNb(), result: newNum, face: numFace });
    };

    const changeNumberDice = (e) => {
        setDice(e.target.value);
    };

    const changeFaceNum = (e) => {
        setFace(parseInt(e.target.value));
    };

    return (
        <Fragment>
            <div className="selector">
                <h3>Room number {getRoomNb()}</h3>
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
            <Result dices={num.result.length} faces={num.face} num={num.result}></Result>
        </Fragment>
    );
}

export default App;
