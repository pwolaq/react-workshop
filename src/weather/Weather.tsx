import React from 'react';

interface WeatherProps {
}

const Weather: React.FunctionComponent<WeatherProps> = ({ children }) => (
    <div className="col-6">
        <div className="card">
            <div className="card-header">
                Weather forecast
            </div>
            <div className="card-body">
                {children}
            </div>
        </div>
    </div>
);

export default Weather;
