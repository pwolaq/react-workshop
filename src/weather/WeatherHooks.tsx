import React, {useMemo, useReducer, useEffect} from "react";
import Weather from "./Weather";
import { useHistory, useParams } from "react-router-dom";
import WeatherForm from "./WeatherForm";
import {Forecast, loadForecast, WeatherContext} from "./utils";

interface RouteInfo {
    city?: string;
}

interface ReducerState {
    loading: boolean;
    error: boolean;
    forecast: Forecast | null;
    city: string;
}

type ReducerAction =
    | { type: 'LOAD_FORECAST' }
    | { type: 'FORECAST_LOADED', forecast: Forecast }
    | { type: 'LOAD_FAILED' }
    | { type: 'SET_CITY', city: string }

const reducer = (currentState: ReducerState, action: ReducerAction): ReducerState => {
    switch (action.type) {
        case 'LOAD_FORECAST':
            return {
                ...currentState,
                loading: true,
                error: false
            };
        case 'FORECAST_LOADED':
            return {
                ...currentState,
                loading: false,
                error: false,
                forecast: action.forecast
            };
        case 'LOAD_FAILED':
            return {
                ...currentState,
                loading: false,
                error: true
            };
        case 'SET_CITY':
            return {
                ...currentState,
                city: action.city
            }
    }
}

const setCity = (city: string): ReducerAction => ({
    type: 'SET_CITY',
    city
});

const _loadForecast = (): ReducerAction => ({
    type: 'LOAD_FORECAST'
});

const loadFailed = (): ReducerAction => ({
    type: 'LOAD_FAILED'
});

const forecastLoaded = (forecast: Forecast): ReducerAction => ({
    type: 'FORECAST_LOADED',
    forecast
});


const WeatherHooks: React.FunctionComponent = () => {
    const history = useHistory();
    const params = useParams<RouteInfo>();
    const [{ loading, error, forecast, city }, dispatch] = useReducer(reducer, {
        loading: false,
        error: false,
        forecast: null,
        city: params.city ?? ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        history.push(`/weather/${city}`);
    };

    useEffect(() => {
        const updatedCity = params.city ?? "";
        dispatch(setCity(updatedCity));

        if (updatedCity !== "") {
            dispatch(_loadForecast());

            loadForecast(updatedCity)
                .then(forecast => dispatch(forecastLoaded(forecast)))
                .catch(() => dispatch(loadFailed()))
        }
    }, [params.city]);

    const value = useMemo(() => ({
        loading,
        error,
        forecast,
        city,
        dispatch
    }), [loading, error, forecast, city, dispatch]);

    return (
        <WeatherContext.Provider value={value}>
            <Weather>
                <WeatherForm
                    onSubmit={handleSubmit}
                    disabled={loading}
                />
            </Weather>
        </WeatherContext.Provider>
    );
};

export default WeatherHooks;
