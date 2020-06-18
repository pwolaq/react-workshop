import React from 'react';

export enum TileType {
    EMPTY,
    CIRCLE,
    CROSS
}

interface TileProps {
    type: TileType;
    disabled: boolean;
    onClick: () => void;
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

const Tile: React.FunctionComponent<TileProps> = ({ type, onClick, disabled }) => (
    <button
        type="button"
        className={`tile btn btn-${COLOR[type]}`}
        onClick={onClick}
        disabled={disabled}
    >
        {TEXT[type]}
    </button>
);

export default Tile;
