import React from "react";
import Weather from "./Weather";
import { RouteComponentProps } from "react-router-dom";
import WeatherForm from "./WeatherForm";

interface WeatherContainerState {
    city: string;
}

interface RouteInfo {
    city?: string;
}

type WeatherContainerProps = RouteComponentProps<RouteInfo>;

class WeatherContainer extends React.Component<WeatherContainerProps, WeatherContainerState> {
    state = {
        city: this.props.match.params.city ?? ""
    };

    componentDidMount() {
        if (this.state.city !== '') {
            this.getForecast();
        }
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
        // TODO
    };

    render() {
        return (
            <Weather>
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
