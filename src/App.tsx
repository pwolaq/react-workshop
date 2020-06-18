import React from 'react';
import Header from "./Header";
import Game from "./Game";

function App() {
    return (
        <div className="container py-5">
            <Header/>
            <div className="row justify-content-center">
                <Game />
            </div>
        </div>
    );
}

export default App;
