import React from 'react';

export interface Forecast {
    main: {
        temp: number;
        pressure: number;
        humidity: number;
    }
}

interface WeatherContextValue {
    loading: boolean;
    error: boolean;
    forecast: Forecast | null;
    city: string;
    dispatch: React.Dispatch<any>
}

export const WeatherContext = React.createContext<WeatherContextValue>({
    loading: false,
    error: false,
    forecast: null,
    city: '',
    dispatch: () => undefined
});

export function loadForecast(city: string): Promise<Forecast> {
    return new Promise<Forecast>((resolve, reject) => {
        const params = new URLSearchParams();
        params.set("q", city);
        params.set("units", "metric");
        params.set("appid", process.env.REACT_APP_API_KEY || "");
        fetch(`https://api.openweathermap.org/data/2.5/weather?${params.toString()}`)
            .then(response => {
                if (response.ok) {
                    response.json().then(resolve);
                } else {
                    reject();
                }
            })
            .catch(reject);
    });
}
