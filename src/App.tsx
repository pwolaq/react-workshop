import React from 'react';
import Header from "./Header";
import GameContainer from "./GameContainer";

function App() {
    return (
        <div className="container py-5">
            <Header/>
            <div className="row justify-content-center">
                <GameContainer />
            </div>
        </div>
    );
}

export default App;
