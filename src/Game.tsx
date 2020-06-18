import React from "react";
import Tile, {TileType} from "./Tile";

const board = [
    TileType.CIRCLE, TileType.CROSS,  TileType.CIRCLE,
    TileType.CROSS,  TileType.CIRCLE, TileType.CROSS,
    TileType.CIRCLE, TileType.EMPTY,  TileType.EMPTY
];

const Game: React.FunctionComponent = () => (
    <div>
        <div className="card">
            <div className="d-flex">
                <div className="p-5">
                    <div className="board">
                        {board.map((type, index) => (
                            <Tile type={type} key={index} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default Game;
