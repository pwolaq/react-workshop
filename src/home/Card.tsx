import React from "react";
import {Link} from "react-router-dom";

interface CardProps {
    title: string;
    button: string;
    url: string;
}

const Card: React.FunctionComponent<CardProps> = ({ title, button, url }) => (
    <div className="col-3">
        <div className="card text-center">
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <Link className="btn btn-primary" to={url}>{button}</Link>
            </div>
        </div>
    </div>
);

export default Card;
