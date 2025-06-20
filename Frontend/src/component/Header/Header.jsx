import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <div className="nav-container">
          
          {/* Logo */}
          <Link to="/" className="logo">
            <h1 style={{fontSize: '24px', fontWeight: 'bold' }}>Blogify</h1>
          </Link>

          {/* Navigation Links */}
          <ul className="nav-links">
            <li><NavLink to="/home" activeClassName="active">Home</NavLink></li>
            <li><NavLink to="/about" activeClassName="active">About</NavLink></li>
            <li><NavLink to="/contact" activeClassName="active">Contact</NavLink></li>
            <li><NavLink to="/github" activeClassName="active">AI Help</NavLink></li>
          </ul>

          {/* Auth Buttons */}
          <div className="auth-buttons">
            <Link to="/addBlog" className="btn signup-btn">
              Create Blog
            </Link>
            <Link to="/signin" className="btn login-btn">
              logOut
            </Link>
          </div>


        </div>
      </nav>
    </header>
  );
}
