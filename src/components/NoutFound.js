import React from 'react';

const NotFound = () => {
  return (
    <div className="not-found-container" style={{background: "url('/images/home/heimer404.jpeg')", backgroundSize:'cover'}}>
      <h1 className="not-found-title">404 - Page Not Found</h1>
      <p className="not-found-text">Oops! The page you are looking for does not exist.</p>
      <a href="/" className="not-found-link">Go back to home</a>
    </div>
  );
};

export default NotFound;
