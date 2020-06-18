import React from 'react';
import {Forecast} from "./utils";

interface WeatherProps {
    error: boolean;
    loading: boolean;
    forecast: Forecast | null;
}

const Weather: React.FunctionComponent<WeatherProps> = ({ children, error, loading, forecast }) => (
    <div className="col-6">
        <div className="card">
            <div className="card-header">
                Weather forecast
            </div>
            <div className="card-body">
                {children}
                {error && (
                    <div className="alert alert-danger my-3" role="alert">Loading forecast data failed!</div>
                )}
                {(loading && (
                    <div className="text-center p-5" data-testid="spinner">
                        <div className="spinner-border text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                )) || (forecast !== null && (
                    <div className="row text-center">
                        <dl className="mt-3 mb-0 col-4">
                            <dt>Temperature</dt>
                            <dd>{forecast.main.temp} &deg;C</dd>
                        </dl>
                        <dl className="mt-3 mb-0 col-4">
                            <dt>Pressure</dt>
                            <dd>{forecast.main.pressure} hPa</dd>
                        </dl>
                        <dl className="mt-3 mb-0 col-4">
                            <dt>Humidity</dt>
                            <dd>{forecast.main.humidity}%</dd>
                        </dl>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default Weather;
