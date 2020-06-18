import React from 'react';

function App() {
  return (
    <div className="container py-5">
      <header className="mb-5">
        <h1 className="d-flex justify-content-between align-items-center">
          <span>React Tutorial App</span>
          <small className="text-muted">v. {new Date().toLocaleDateString()}</small>
        </h1>
        <hr />
      </header>
      <div className="row justify-content-center">
        TODO
      </div>
    </div>
  );
}

export default App;
