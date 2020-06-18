import React from "react";
import Tile, {TileType} from "./Tile";

const Game: React.FunctionComponent = () => (
    <div>
        <div className="card">
            <div className="d-flex">
                <div className="p-5">
                    <div className="board">
                        <Tile type={TileType.CIRCLE} />
                        <Tile type={TileType.CROSS} />
                        <Tile type={TileType.CIRCLE} />
                        <Tile type={TileType.CROSS} />
                        <Tile type={TileType.CIRCLE} />
                        <Tile type={TileType.CROSS} />
                        <Tile type={TileType.CIRCLE} />
                        <Tile type={TileType.EMPTY} />
                        <Tile type={TileType.EMPTY} />
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default Game;
