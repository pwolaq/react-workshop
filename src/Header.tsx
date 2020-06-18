import React from "react";

const Header: React.FunctionComponent = () => (
    <header className="mb-5">
        <h1 className="d-flex justify-content-between align-items-center">
            <span>React Tutorial App</span>
            <small className="text-muted">v. {new Date().toLocaleDateString()}</small>
        </h1>
        <hr />
    </header>
);

export default Header;
