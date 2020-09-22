import React from "react";
import "./Result.css";
import Dice from "../Dice/Dice";

function App(props) {
    const { dices, faces, num } = props;
    return (
        <React.Fragment>
            <div className="result">
                {faces === 6 && dices <= 5 ? (
                    num.map((el, index) => <Dice key={index} number={el}></Dice>)
                ) : (
                    <p>
                        {num.map((el, index) => {
                            if (num.length === 1) {
                                return <span key={index}>{el}</span>;
                            }
                            if (index === num.length - 1) {
                                return (
                                    <span key={index}>
                                        {el}
                                        {" = "} {num.reduce((acc, reduc) => acc + reduc)}
                                    </span>
                                );
                            } else {
                                return (
                                    <span key={index}>
                                        {el}
                                        {" + "}
                                    </span>
                                );
                            }
                        })}
                    </p>
                )}
            </div>
        </React.Fragment>
    );
}

export default App;
