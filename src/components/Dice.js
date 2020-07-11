import React, { useEffect, useState } from "react";
import "./Dice.css";

function App(props) {
    const [tab, setTab] = useState([
        [false, false, false],
        [false, false, false],
        [false, false, false],
    ]);
    useEffect(() => {
        const inter = [
            [false, false, false],
            [false, false, false],
            [false, false, false],
        ];
        switch (props.number) {
            case 1:
                inter[1][1] = true;
                break;
            case 2:
                inter[0][0] = true;
                inter[2][2] = true;
                break;
            case 3:
                inter[0][0] = true;
                inter[1][1] = true;
                inter[2][2] = true;
                break;
            case 4:
                inter[0][0] = true;
                inter[0][2] = true;
                inter[2][0] = true;
                inter[2][2] = true;
                break;
            case 5:
                inter[0][0] = true;
                inter[0][2] = true;
                inter[2][0] = true;
                inter[2][2] = true;
                inter[1][1] = true;
                break;
            case 6:
                inter[0][0] = true;
                inter[0][2] = true;
                inter[2][0] = true;
                inter[2][2] = true;
                inter[1][0] = true;
                inter[1][2] = true;
                break;
            default:
        }
        setTab(inter);
    }, [props.number]);

    return (
        <div className="dice">
            <div className="row">
                <span className={tab[0][0] ? "full" : "empty"}></span>
                <span className={tab[0][1] ? "full" : "empty"}></span>
                <span className={tab[0][2] ? "full" : "empty"}></span>
            </div>
            <div className="row">
                <span className={tab[1][0] ? "full" : "empty"}></span>
                <span className={tab[1][1] ? "full" : "empty"}></span>
                <span className={tab[1][2] ? "full" : "empty"}></span>
            </div>
            <div className="row">
                <span className={tab[2][0] ? "full" : "empty"}></span>
                <span className={tab[2][1] ? "full" : "empty"}></span>
                <span className={tab[2][2] ? "full" : "empty"}></span>
            </div>
        </div>
    );
}

export default App;
