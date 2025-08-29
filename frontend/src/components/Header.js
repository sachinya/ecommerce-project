import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ username, onLogout }) => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Ecommerce</Link>
      </div>
      <nav className="nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
        </ul>
      </nav>
      <div className="user-info">
        {username && (
          <>
            <span style={{ marginRight: '12px' }}>Logged in as: {username}</span>
            <button onClick={onLogout}>Logout</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;