import React, { useState } from "react";
import "./App.css";
import Dice from "./Dice";

function App() {
    const [num, setNum] = useState(0);

    const changeNumber = () => {
        setNum(Math.floor(Math.random() * 6) + 1);
    };

    return (
        <div className="App">
            <div className="header">
                <h1>BE DICE</h1>
            </div>
            <div className="main">
                <button onClick={changeNumber}>Roll a dice</button>
                {num !== 0 && <Dice number={num}></Dice>}
            </div>
        </div>
    );
}

export default App;
