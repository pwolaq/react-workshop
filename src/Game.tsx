import React from "react";
import Tile, {TileType} from "./Tile";

interface GameProps {
    board: TileType[];
    onSelect: (index: number) => void;
}

const Game: React.FunctionComponent<GameProps> = ({ board, onSelect }) => (
    <div>
        <div className="card">
            <div className="d-flex">
                <div className="p-5">
                    <div className="board">
                        {board.map((type, index) => (
                            <Tile
                                type={type}
                                key={index}
                                onClick={() => onSelect(index)}
                                disabled={type !== TileType.EMPTY}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default Game;
