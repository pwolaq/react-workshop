import React from "react";
import Tile, {TileType} from "./Tile";
import {calculateDraw, calculateWinner} from "./utils";

interface GameProps {
    board: TileType[];
    onSelect: (index: number) => void;
}

const Game: React.FunctionComponent<GameProps> = ({ board, onSelect }) => {
    const winner = calculateWinner(board);
    const isDraw = calculateDraw(winner, board);

    return (
        <div>
            <div className="card">
                <div className="d-flex">
                    <div className="p-5">
                        {(winner !== null && (
                            <div className="alert alert-success text-center">
                                The winner is: <strong>Player {winner === TileType.CIRCLE ? 'O' : 'X'}</strong>!
                            </div>
                        )) || (isDraw && (
                            <div className="alert alert-warning text-center">
                                It's a draw!
                            </div>
                        ))}
                        <div className="board">
                            {board.map((type, index) => (
                                <Tile
                                    type={type}
                                    key={index}
                                    onClick={() => onSelect(index)}
                                    disabled={type !== TileType.EMPTY || winner !== null}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Game;
