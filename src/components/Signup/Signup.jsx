import React, { useState,useEffect } from 'react';
import InputField from '../InputField/InputField.jsx';
import Button from '../Button/index.jsx';
import axios from 'axios';

export default function Signup() {
	const [formDetails, setFormDetails] = useState({});
	let { firstname, lastname, email, password, retypedPassword, phone, gender } = formDetails;
	const handleChange = function(event) {
		if (event.target.checked) {
			console.log(event);
			setFormDetails({...formDetails, [event.target.name]: event.target.value });
		}
		setFormDetails({ ...formDetails, [event.target.name]: event.target.value });
		
	};

	function handleSubmit(evt) {
		evt.preventDefault();
		const user = formDetails;
		postToDB(user);
	}
	const postToDB = user => {
		axios.post('http://localhost:3000/users/', user);
	};
	return (
		<div className="containerforlogin" style={{ height: '800px' }}>
			<form onSubmit={handleSubmit} className="containerLogin">
				<h3>Sign Up</h3>

				<label htmlFor="firstname">First Name</label>
				<InputField
					id="firstname"
					name="firstname"
					className="inputField"
					placeholder="Enter first name"
					type="text"
					change={handleChange}
					value={firstname}
				/>
				<label htmlFor="lastname">Last Name</label>
				<InputField
					id="lastname"
					name="lastname"
					className="inputField"
					placeholder="Enter last name"
					type="text"
					change={handleChange}
					value={lastname}
				/>
				<label htmlFor="email">Email</label>
				<InputField
					id="email"
					name="email"
					className="inputField"
					placeholder="Enter mail"
					type="email"
					change={handleChange}
					value={email}
				/>
				<div>
					<p>Gender</p>
				</div>
				<div style={{ display: 'flex', alignContent: 'center', width: '45%', marginBottom: '5px' }}>
					<label style={{ margin: '5px' }} htmlFor="male">
						Male
					</label>
					<input
						checked={gender === 'male'}
						onChange={handleChange}
						value="male"
						id="male"
						name="gender"
						type="radio"
						required
					/>
					<label style={{ margin: '5px' }} htmlFor="female">
						Female
					</label>
					<input
						checked={gender === 'female'}
						onChange={handleChange}
						value="female"
						id="female"
						name="gender"
						type="radio"
						required
					/>
				</div>
				<label htmlFor="phone">Phone</label>
				<InputField
					id="phone"
					name="phone"
					className="inputField"
					placeholder="Enter phone number eg 08182988304"
					type="tel"
					pattern="\d{11}"
					change={handleChange}
					value={phone}
				/>
				<label htmlFor="image">Image</label>
				<InputField
					id="image"
					name="image"
					className="inputField"
				accept="*/"
					type="file"
					pattern="\d{11}"
					change={handleChange}
					value={phone}
				/>

				<label htmlFor="password">Password</label>
				<InputField
					value={password}
					change={handleChange}
					name="password"
					id="password"
					className="inputField"
					placeholder="Enter password"
					type="password"
				/>
				<label htmlFor="retypedPassword">Retype Password</label>
				<InputField
					value={retypedPassword}
					change={handleChange}
					name="retypedPassword"
					id="retypedPassword"
					className="inputField"
					placeholder="Enter password"
					type="password"
				/>
				<Button hoverTitle="sign up" buttonLabel="sign up " buttonClass="outline-success" buttonWidth="100px" />
			</form>
		</div>
	);
}
