import React from "react";
import Weather from "./Weather";
import { useHistory, useParams } from "react-router-dom";
import WeatherForm from "./WeatherForm";
import {Forecast, loadForecast} from "./utils";

interface RouteInfo {
    city?: string;
}

const WeatherHooks: React.FunctionComponent = () => {
    const history = useHistory();
    const params = useParams<RouteInfo>();
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [forecast, setForecast] = React.useState<Forecast | null>(null);
    const [city, setCity] = React.useState(params.city ?? "");

    const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => setCity(e.target.value);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        history.push(`/weather/${city}`);
    };

    React.useEffect(() => {
        const updatedCity = params.city ?? "";
        setCity(updatedCity);

        if (updatedCity !== "") {
            setError(false);
            setLoading(false);

            loadForecast(updatedCity)
                .then(setForecast)
                .catch(() => {
                    setError(true);
                    setForecast(null);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [params.city]);

    return (
        <Weather
            error={error}
            loading={loading}
            forecast={forecast}
        >
            <WeatherForm
                city={city}
                onCityChange={handleCityChange}
                onSubmit={handleSubmit}
            />
        </Weather>
    );
};

export default WeatherHooks;
