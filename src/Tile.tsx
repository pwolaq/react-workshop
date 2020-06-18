import React from 'react';

export enum TileType {
    EMPTY,
    CIRCLE,
    CROSS
}

interface TileProps {
    type: TileType;
}

const TEXT = {
    [TileType.EMPTY]: '',
    [TileType.CIRCLE]: 'O',
    [TileType.CROSS]: 'X',
};

const COLOR = {
    [TileType.EMPTY]: 'outline-secondary',
    [TileType.CIRCLE]: 'success',
    [TileType.CROSS]: 'info',
};

const Tile: React.FunctionComponent<TileProps> = (props) => (
    <button
        type="button"
        className={`tile btn btn-${COLOR[props.type]}`}
    >
        {TEXT[props.type]}
    </button>
);

export default Tile;
