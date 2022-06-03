import React, { useContext } from 'react';
import { WeatherContext } from "./utils";

interface WeatherFormProps {
    disabled: boolean;
    onSubmit: (e: React.FormEvent) => void;
}

const WeatherForm: React.FunctionComponent<WeatherFormProps> = ({ onSubmit, disabled }) => {
    const { city, dispatch } = useContext(WeatherContext);
    const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => dispatch({
        type: 'SET_CITY',
        city: e.target.value
    });
    return (
        <form onSubmit={onSubmit}>
            <div className="form-row align-items-center">
                <div className="col">
                    <input type="text" className="form-control" placeholder="City" value={city} onChange={handleCityChange} disabled={disabled} />
                </div>
                <div className="col-auto">
                    <button type="submit" className="btn btn-primary" disabled={city === "" || disabled}>Get forecast</button>
                </div>
            </div>
        </form>
    );
}

export default WeatherForm;
