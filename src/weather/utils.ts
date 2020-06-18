export interface Forecast {
    main: {
        temp: number;
        pressure: number;
        humidity: number;
    }
}

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
