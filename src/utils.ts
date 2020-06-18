import {TileType} from "./Tile";

const emptyCount = (board: TileType[]) => board.filter(type => type === TileType.EMPTY).length;

export const isCircleNext = (board: TileType[]) => emptyCount(board) % 2 === 0;

export function calculateWinner(board: TileType[]): TileType | null {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
}

export const calculateDraw = (winner: TileType | null, board: TileType[]) => winner === null && emptyCount(board) === 0;
