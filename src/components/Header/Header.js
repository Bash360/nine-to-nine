import React from 'react';
import './Header.css';
import Nav from '../Nav/Nav';
import Search from '../Search/Search';
import logo from './logo.jpg';
export default function Header() {
  return (
    <header className="container">
      <div>
        <img className="icon" src={logo} alt="logo" />
      </div>
      <div>
        <Search className="search" />
      </div>
      <div>
        <Nav />
      </div>
    </header>
  );
}
