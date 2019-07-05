import React from 'react';
import './Form.css';
import NavLink from '../Link/NavLink.jsx';
import Button from '../Button/index.jsx';
import InputField from '../InputField/InputField.jsx';
export default function LoginForm() {
	return (
		<div className="containerforlogin">
      <form className="containerLogin">
				<h3>Log In</h3>
				<label htmlFor="email">Email</label>
				<InputField id="email" type="email" className="inputfield-invalid" placeholder="enter email"/>
				<label hmtlfor="password">Password</label>
				<InputField id="password" type="password" className="inputfield-invalid" placeholder="enter password"/>
				<Button hoverTitle="sign in" buttonLabel="sign in" buttonClass="outline-success" buttonWidth="100px" />
        
        </form>
        <p className="noaccount">
				Don't have an account? signup here <span style={{ borderRadius: "5px", width: "100px", margin: "auto", textAlign: "center", padding: "5px" }} className="primary outline-primary"><NavLink title="sign up" size="100px"  where="/signup" text="sign up"/></span>
        </p>
      
		</div>
	);
}
