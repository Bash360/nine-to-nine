import React, { useState} from 'react';
import './Form.css';
import Link from '../Link/NavLink.jsx';
import Button from '../Button/index.jsx';
import InputField from '../InputField/InputField.jsx';
import axios from 'axios';
export default function LoginForm() {
		const [formDetails, setFormDetails] = useState({});
	function handleSubmit(evt) { 
		evt.preventDefault();
	}

	const getProfile = async (user) => { 
	let profile = await 	axios.get("http://localhost:3000/");
	}
	let { email, password } = formDetails;

	const handleChange = function(event) {
		setFormDetails({...formDetails, [event.target.name]: event.target.value });
	};
	return (
		<div className="containerforlogin">
			<form onSubmit={handleSubmit} className="containerLogin">
				<h3>Log In</h3>
				<label htmlFor="email">Email</label>
				<InputField value={email} change={handleChange} id="email" name="email" type="email" className="inputfield-invalid" placeholder="enter email"/>
				<label hmtlfor="password">Password</label>
				<InputField value={password} change={handleChange} name="password" id="password" type="password" className="inputfield-invalid" placeholder="enter password"/>
				<Button hoverTitle="sign in" buttonLabel="sign in" buttonClass="outline-success" buttonWidth="100px" />
        
        </form>
        <p className="noaccount">
				Don't have an account? signup here <span style={{ borderRadius: "5px", width: "100px", margin: "auto", textAlign: "center", padding: "5px" }} className="primary outline-primary"><Link title="sign up" size="100px"  where="/signup" text="sign up"></Link></span>
        </p>
      
		</div>
	);
}
