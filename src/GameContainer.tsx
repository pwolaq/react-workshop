import React from "react";
import {TileType} from "./Tile";
import Game from "./Game";
import {isCircleNext} from "./utils";

interface GameState {
    board: TileType[];
}

class GameContainer extends React.Component<any, GameState> {
    state = {
        board: Array(9).fill(TileType.EMPTY)
    };

    handleSelect = (index: number) => {
        this.setState(state => {
            const board = [...state.board];
            board[index] = isCircleNext(state.board) ? TileType.CIRCLE : TileType.CROSS;
            return {
                board
            };
        });
    };

    render() {
        return (
            <Game board={this.state.board} onSelect={this.handleSelect} />
        );
    }
}

export default GameContainer;
