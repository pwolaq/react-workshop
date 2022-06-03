import React from 'react';
import Header from "./Header";
import GameContainer from "./game/GameContainer";
import { Switch, Route } from 'react-router-dom';
import WeatherHooks from "./weather/WeatherHooks";
import Home from "./home/Home";

function App() {
    return (
        <div className="container py-5">
            <Header/>
            <div className="row justify-content-center">
                <Switch>
                    <Route path="/game" component={GameContainer} />
                    <Route path="/weather/:city?" component={WeatherHooks} />
                    <Route component={Home} />
                </Switch>
            </div>
        </div>
    );
}

export default App;
