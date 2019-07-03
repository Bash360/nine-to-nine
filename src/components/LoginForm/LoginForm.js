import React from 'react';
import './LoginForm.css';
export default function LoginForm() {
  return (
    <form >
      <div className="container">
      <div>
      <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="email" required />
      </div>
      <div>
          <label htmlFor="password">Password</label>
        </div>
      <div>
        <input id="password" name="password" type="password" placeholder="password" required />
      </div>
        <div><button type="submit">log in</button></div>
      </div>
    </form>
     
  );
}
