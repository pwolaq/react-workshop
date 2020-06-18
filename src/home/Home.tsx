import React from 'react';
import Card from "./Card";

const Home: React.FunctionComponent = () => (
    <React.Fragment>
        <Card
            title="Tic-tac-toe"
            button="Play a game"
            url="/game"
        />
        <Card
            title="Open Weather API"
            button="Get forecast"
            url="/weather"
        />
    </React.Fragment>
);

export default Home;
