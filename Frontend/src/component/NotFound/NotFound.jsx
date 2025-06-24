import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css"; // import the CSS file

export default function NotFound() {
  return (
    <div className="notfound-container">
      <h1 className="notfound-title">404</h1>
      <p className="notfound-subtitle">Page Not Found</p>
      <Link to="/" className="notfound-link">
        Go to Home
      </Link>
    </div>
  );
}
