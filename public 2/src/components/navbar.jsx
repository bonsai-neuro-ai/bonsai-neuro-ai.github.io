import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="navbar-header">
      <NavLink to="/" className="navbar-logo">
        <img src="/logo.png" alt="Bonsai Lab Logo" />
      </NavLink>
      <nav className="navbar-nav">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
        <NavLink to="/people" className={({ isActive }) => (isActive ? 'active' : '')}>People</NavLink>
        <NavLink to="/research" className={({ isActive }) => (isActive ? 'active' : '')}>Research</NavLink>
        <NavLink to="/publications" className={({ isActive }) => (isActive ? 'active' : '')}>Publications</NavLink>
        <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>Contact</NavLink>
      </nav>
    </header>
  );
};

export default Navbar;