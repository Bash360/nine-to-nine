import React from 'react';
import './Header.css';
import Nav from '../Nav/Nav';
import Search from '../Search/Search';
import logo from './logo.jpg';
export default function Header() {
  return (
    <header className="container">
      <img className="icon" src={logo} alt="logo"/>
      <Search/>
       <Nav/>
    </header>
  );
}
