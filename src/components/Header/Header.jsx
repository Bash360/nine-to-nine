import React, { useState} from 'react';
import './Header.css';
import NavLink from '../Link/NavLink.jsx';
import InputField from '../InputField/InputField.jsx';
import logo from './logo.jpg';
import Button from '../Button';

export default function Header() {
 const [search, setSearch] = useState("");

	const handleChange = function(event) {
		setSearch(event.target.value);
	};
	function handleSubmit(evt) { 
		evt.preventDefault();
	}
	return (
		<header className="containerHeader">
			<img src={logo} className="icon" alt="logo" />
			<form onSubmit={handleSubmit} className="search">
				<InputField
					id="search"
					placeholder="search for services offered"
					name="search"
					change={handleChange}
					className="inputField"
					value={search}
				/>
				<Button hoverTitle="Search" buttonLabel="search" buttonClass="outline-success" buttonWidth="100px" />
			</form>
			<nav>
				<ul>
					<li className="primary outline-primary ">
						<NavLink title="home"  where="/" text="Home" />
					</li>
					<li className="primary outline-primary ">
						<NavLink title="login" where="/login" text="sign in" />
					</li>

					<li className="primary outline-primary ">
						<NavLink title="sign up" where="/signup" text="Sign up" />
					</li>
					<li className="primary outline-primary ">
						<NavLink title="services" where="/services" text="Services" />
					</li>
					
				</ul>
			</nav>
		</header>
	);
}
