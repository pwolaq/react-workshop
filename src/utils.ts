import {TileType} from "./Tile";

export const isCircleNext = (board: TileType[]) => board.filter(type => type === TileType.EMPTY).length % 2 === 0;
