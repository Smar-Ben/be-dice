import "./Header.css";
import React from "react";

function App(props) {
    return (
        <div className="App">
            <div className="header">
                <h1>BE DICE</h1>
            </div>
            <div className="main">{props.children}</div>
        </div>
    );
}
export default App;
