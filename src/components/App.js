import React, { useState } from "react";
import "./App.css";
import Dice from "./Dice";

function App() {
    const [numDice, setDice] = useState(1);
    const [numFace, setFace] = useState(6);
    const [num, setNum] = useState([]);

    const changeNumber = () => {
        const newNum = new Array(numDice);
        for (let i = 0; i < numDice; i++) {
            newNum[i] = Math.floor(Math.random() * numFace) + 1;
        }
        setNum(newNum);
    };
    const changeNumberDice = (e) => {
        setDice(e.target.value);
    };
    const changeFaceNum = (e) => {
        setFace(e.target.value);
    };
    return (
        <div className="App">
            <div className="header">
                <h1>BE DICE</h1>
            </div>
            <div className="main">
                <div className="selector">
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
                <div className="result">
                    {num.map((el, index) => (
                        <Dice key={index} number={el}></Dice>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
