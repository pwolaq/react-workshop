import React from "react";
import {TileType} from "./Tile";
import Game from "./Game";
import {isCircleNext} from "./utils";

const GameWithHooks: React.FunctionComponent = () => {
    const [board, setBoard] = React.useState(Array(9).fill(TileType.EMPTY));

    const handleSelect = (index: number) => {
        const updatedBoard = [...board];
        updatedBoard[index] = isCircleNext(board) ? TileType.CIRCLE : TileType.CROSS;
        setBoard(updatedBoard);
    };

    return (
        <Game board={board} onSelect={handleSelect} />
    );
}

export default GameWithHooks;
