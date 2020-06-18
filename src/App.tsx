import React from 'react';
import Header from "./Header";
import GameContainer from "./game/GameContainer";
import { Switch, Route } from 'react-router-dom';
import WeatherContainer from "./weather/WeatherContainer";
import Home from "./home/Home";

function App() {
    return (
        <div className="container py-5">
            <Header/>
            <div className="row justify-content-center">
                <Switch>
                    <Route path="/game" component={GameContainer} />
                    <Route path="/weather/:city?" component={WeatherContainer} />
                    <Route component={Home} />
                </Switch>
            </div>
        </div>
    );
}

export default App;
