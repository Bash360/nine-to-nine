import React, { useState, useEffect } from 'react';
import InputField from '../InputField/InputField.jsx';
import Button from '../Button/index.jsx';
import axios from 'axios';
import './Signup.css';
import generateUserID from '../../generate-randomID.js';

export default function Signup() {
	const [formDetails, setFormDetails] = useState({ image: null });

	let { firstname, lastname, email, password, retypedPassword, phone, gender, image } = formDetails;
	const handleChange = function (event) {
		if (event.target.checked) {
			setFormDetails({ ...formDetails, [event.target.name]: event.target.value });
		} else if (event.target.files) {
			let reader = new FileReader();
			reader.onload = function (evt) {
				setFormDetails({ ...formDetails, image: evt.target.result });
			};
			reader.readAsDataURL(event.target.files[0]);
		} else {
			setFormDetails({ ...formDetails, [event.target.name]: event.target.value });
			
		}
		};
	

		function handleSubmit(evt) {
			evt.preventDefault();

			const user = {
				id: generateUserID(),
				firstname,
				lastname,
				email,
				password,
				phone,
				gender,
				image
			};
			
			postToDB(user);
		}
		const postToDB = user => {
			try {
				axios.post('http://localhost:3000/users/', user);
			} catch (err) {
				console.error(err);
			}
		};
		return (
			<div className="containerforlogin" style={{ height: '1000px' }}>
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
					<label htmlFor="image" style={{ borderBottom: '0px' }}>
						Choose a picture:
				</label>
					<InputField change={handleChange} accept="image/*" name="image" className="inputField" type="file" />
					{image !== null && <img id="thumbnail" src={image} className="thumbnail" alt="" />}

					<label htmlFor="password">Password</label>
					<InputField
						minlength="4"
						value={password}
						change={handleChange}
						name="password"
						id="password"
						className="inputField"
						placeholder="Enter password four characters atleast"
						type="password"
					/>
					<label htmlFor="retypedPassword">Retype Password</label>
					<InputField
						minlength="4"
						value={retypedPassword}
						change={handleChange}
						name="retypedPassword"
						id="retypedPassword"
						className="inputField"
						placeholder="Enter password four characters atleast"
						type="password"
						pattern={`${password}`}
					/>
					{password !== retypedPassword  && <p style={{ color: "red", marginBottom: "2px" }}>passwords must match</p>}
					<Button hoverTitle="sign up" buttonLabel="sign up " buttonClass="outline-success" buttonWidth="100px" />
				</form>
			</div>
		);
	}
