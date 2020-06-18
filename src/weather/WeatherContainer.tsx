import React from "react";
import Weather from "./Weather";
import { RouteComponentProps } from "react-router-dom";
import WeatherForm from "./WeatherForm";
import {Forecast, loadForecast} from "./utils";

interface WeatherContainerState {
    city: string;
    loading: boolean;
    error: boolean;
    forecast: Forecast | null;
}

interface RouteInfo {
    city?: string;
}

type WeatherContainerProps = RouteComponentProps<RouteInfo>;

class WeatherContainer extends React.Component<WeatherContainerProps, WeatherContainerState> {
    state = {
        city: this.props.match.params.city ?? "",
        loading: false,
        error: false,
        forecast: null
    };

    componentDidMount() {
        this.getForecast();
    }

    componentDidUpdate(prevProps: Readonly<WeatherContainerProps>) {
        if (prevProps.match.params.city !== this.props.match.params.city) {
            this.setState({
                city: this.props.match.params.city ?? ""
            }, this.getForecast);
        }
    }

    handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({
        city: e.target.value
    });

    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        this.props.history.push(`/weather/${this.state.city}`);
    };

    getForecast = () => {
        if (this.state.city !== "") {
            this.setState({
                error: false,
                loading: true
            });

            loadForecast(this.state.city)
                .then(forecast => {
                    this.setState({
                        forecast
                    });
                })
                .catch(() => {
                    this.setState({
                        error: true,
                        forecast: null
                    });
                })
                .finally(() => {
                    this.setState({
                        loading: false
                    });
                });
        }
    };

    render() {
        return (
            <Weather
                error={this.state.error}
                loading={this.state.loading}
                forecast={this.state.forecast}
            >
                <WeatherForm
                    city={this.state.city}
                    onCityChange={this.handleCityChange}
                    onSubmit={this.handleSubmit}
                />
            </Weather>
        );
    }
}

export default WeatherContainer;
