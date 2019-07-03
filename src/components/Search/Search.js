import React from 'react';
import "./Search.css";

export default function Search() {
  return (
    <form>
        <input id="search" className="form-control" type="text" placeholder="search" />
        <button className="button" type="submit"><i className="fas fa-search"></i>Search</button>
    </form>
  ); 
}