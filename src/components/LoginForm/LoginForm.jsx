import React from 'react';
import './LoginForm.css';
import NavLink from '../Link/NavLink.jsx';
import Button from '../Button/index.jsx';
import InputField from '../InputField/InputField.jsx';
export default function LoginForm() {
	return (
		<React.Fragment>
      <form className="containerLogin">
				<h3>Log In</h3>
				<label htmlFor="name">Email</label>
				<InputField type="email" id="email" className="inputfield-invalid" placeholder="enter email"/>
				<label hmtlfor="password">Password</label>
				<InputField type="password" className="inputfield-invalid" id="password" placeholder="enter password"/>
				<Button hoverTitle="sign in" buttonLabel="sign in" buttonClass="outline-success" buttonWidth="100px" />
        
        </form>
        <p className="noaccount">
				Don't have an account? signup here <div style={{ borderRadius: "5px", width: "100px", margin: "auto", textAlign: "center", padding: "5px" }} className="primary outline-primary"><NavLink title="sign up" size="100px"  where="/signup" text="sign up"/></div>
        </p>
      
		</React.Fragment>
	);
}
