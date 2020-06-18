import React from 'react';

interface WeatherFormProps {
    city: string;
    onCityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
}

const WeatherForm: React.FunctionComponent<WeatherFormProps> = ({ city, onCityChange, onSubmit }) => (
    <form onSubmit={onSubmit}>
        <div className="form-row align-items-center">
            <div className="col">
                <input type="text" className="form-control" placeholder="City" value={city} onChange={onCityChange} />
            </div>
            <div className="col-auto">
                <button type="submit" className="btn btn-primary" disabled={city === ""}>Get forecast</button>
            </div>
        </div>
    </form>
);

export default WeatherForm;
