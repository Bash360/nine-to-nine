import React from 'react';
import './LoginForm.css';
export default function LoginForm() {
  return (
    <form className="container">
      <label htmlFor="search">Search</label>
     <input id="search"  name="search" type="text" placeholder="search services"/>
    </form>
  );
}
