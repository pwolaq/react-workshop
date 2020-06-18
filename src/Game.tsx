import React from "react";

const Game: React.FunctionComponent = () => (
    <div>
        <div className="card">
            <div className="d-flex">
                <div className="p-5">
                    <div className="board">
                        <button type="button" className="tile btn btn-success">O</button>
                        <button type="button" className="tile btn btn-info">X</button>
                        <button type="button" className="tile btn btn-success">O</button>
                        <button type="button" className="tile btn btn-info">X</button>
                        <button type="button" className="tile btn btn-success">O</button>
                        <button type="button" className="tile btn btn-info">X</button>
                        <button type="button" className="tile btn btn-success">O</button>
                        <button type="button" className="tile btn btn-outline-secondary" />
                        <button type="button" className="tile btn btn-outline-secondary" />
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default Game;
