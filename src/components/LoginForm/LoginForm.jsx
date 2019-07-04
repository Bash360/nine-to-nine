import React from 'react';
import './LoginForm.css';
import NavLink from '../Link/NavLink.jsx';
import Button from '../Button/index.jsx';
export default function LoginForm() {
	return (
		<React.Fragment>
      <form className="containerLogin">
				<h1>Log In</h1>
				<label htmlFor="name">Email</label>
				<input type="email" id="email" placeholder="enter email" required />
				<label hmtlfor="password">Password</label>
				<input type="password" id="password" placeholder="enter password" required />
				<Button hoverTitle="sign in" buttonLabel="sign in" buttonClass="outline-success" buttonWidth="100px" />
        
        </form>
        <p className="noaccount">
				Don't have an account? signup here <div style={{ borderRadius: "5px", width: "100px", margin: "auto", textAlign: "center", padding: "5px" }} className="primary outline-primary"><NavLink title="sign up" size="100px"  where="/signup" text="sign up"/></div>
        </p>
      
		</React.Fragment>
	);
}
